import { Queue, Worker, Job } from "bullmq";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { compressVideo } from "../utils/compressVideo";
import {
  PAYLOAD_API_KEY,
  PAYLOAD_API_URL,
  REDIS_HOST,
  REDIS_PORT,
  VIDEO_PATH,
  VIDEO_QUEUE_NAME,
} from "../config";

const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const payloadAPI = axios.create({
  baseURL: PAYLOAD_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `users API-Key ${PAYLOAD_API_KEY}`,
  },
});

// Typen für die API-Responses
interface Video {
  id: string;
  filename: string;
  filesize: number;
  compressionStatus: "pending" | "processing" | "completed" | "failed";
  originalSize?: number;
  compressedSize?: number;
}

interface PayloadResponse<T> {
  docs?: T[];
  doc?: T;
}

export const videoQueue = new Queue(VIDEO_QUEUE_NAME, { connection });

export const initializeVideoWorker = () => {
  const worker = new Worker(
    VIDEO_QUEUE_NAME,
    async (job: Job<{ videoId: string; originalFilename: string }>) => {
      const { videoId, originalFilename } = job.data;
      console.log(`Processing video compression for ID: ${videoId}`);

      try {
        // 1. Video aus der Datenbank laden
        const videoResponse = await payloadAPI.get<Video>(`/videos/${videoId}`);
        const video = videoResponse.data;

        if (!video) {
          throw new Error(`Video with ID ${videoId} not found.`);
        }

        // 2. Status auf 'processing' setzen
        await payloadAPI.patch(`/videos/${videoId}`, {
          compressionStatus: "processing",
        });

        const uploadDir = "videos";
        const originalPath = path.join(VIDEO_PATH, uploadDir, originalFilename);
        const compressedFilename = `compressed-${Date.now()}-${originalFilename}`;
        const compressedPath = path.join(
          process.cwd(),
          uploadDir,
          compressedFilename
        );

        const originalStats = await fs.stat(originalPath);

        // 3. Video komprimieren
        await compressVideo(originalPath, compressedPath);
        const compressedStats = await fs.stat(compressedPath);

        // 4. Originaldatei mit der komprimierten Version ersetzen
        await fs.rename(compressedPath, originalPath);

        // 5. Datenbank aktualisieren
        await payloadAPI.patch(`/videos/${videoId}`, {
          filesize: compressedStats.size,
          compressionStatus: "completed",
          size: compressedStats.size,
        });

        console.log(
          `Video ${videoId} compressed: ${originalStats.size} -> ${compressedStats.size} bytes`
        );
      } catch (error) {
        console.error(`Video compression failed for ID: ${videoId}`, error);

        try {
          // Fehlerstatus setzen
          await payloadAPI.patch(`/videos/${videoId}`, {
            compressionStatus: "failed",
          });
        } catch (updateError) {
          console.error(
            `Failed to update error status for video ${videoId}:`,
            updateError
          );
        }

        // Fehler erneut werfen für BullMQ
        throw error;
      }
    },
    {
      connection,
      concurrency: 1,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error: ${err.message}`);
  });

  // Fehlerbehandlung für Verbindungsprobleme
  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  console.log("Video worker initialized.");
  return worker;
};
