import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Payload API Konfiguration
export const PAYLOAD_API_URL =
  process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
export const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY; // Optional: API Key für Authentifizierung

export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);
export const VIDEO_QUEUE_NAME = "video-compression";

export const VIDEO_PATH =
  process.env.VIDEO_PATH ||
  "/Users/tobi/Youtube/monorepo/apps/websites/payloadcms";
