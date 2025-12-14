import { spawn, ChildProcess } from "child_process";
import fs from "fs/promises";
import path from "path";

export interface CompressionResult {
  success: boolean;
  outputPath: string;
  error?: string;
}

const crf = 30;
const frameRate = 20;
const maxWidth = 1280;
const maxHeight = 720;
const removeAudio = true;

export const compressVideo = async (
  inputPath: string,
  outputPath: string
): Promise<CompressionResult> => {
  // Eingabedatei validieren
  try {
    await fs.access(inputPath);
  } catch (error) {
    throw new Error(`Input file not accessible: ${inputPath}`);
  }

  const videoFilter = `scale='min(${maxWidth},iw)':'min(${maxHeight},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=${frameRate}`;

  // Output-Verzeichnis erstellen falls nötig
  const outputDir = path.dirname(outputPath);
  await fs.mkdir(outputDir, { recursive: true });

  const args: string[] = [];
  args.push("-y");
  args.push("-i", inputPath);

  args.push("-c:v", "libaom-av1");
  // https://gitlab.com/AOMediaCodec/SVT-AV1/-/blob/master/Docs/CommonQuestions.md#improving-decoding-performance
  args.push("-preset", "7");

  // Enable multi-thread encoding
  args.push("-cpu-used", "2");
  args.push("-row-mt", "1");

  args.push("-vf", videoFilter);
  args.push("-movflags", "+faststart");

  if (removeAudio) {
    args.push("-an");
  } else {
    args.push("-c:a", "libopus", "-b:a", "96k");
    // args.push("-c:a", "aac", "-b:a", "128k");
  }

  args.push("-crf", `${crf}`);
  args.push("-b:v", "0");

  args.push("-pix_fmt", "yuv420p");
  args.push(outputPath);

  return new Promise<CompressionResult>((resolve, reject) => {
    console.log("FFmpeg command:", "ffmpeg", args.join(" "));

    const ffmpeg: ChildProcess = spawn("ffmpeg", args);

    let stdout = "";
    let stderr = "";

    ffmpeg.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString();
    });

    ffmpeg.stderr?.on("data", (data: Buffer) => {
      const msg = data.toString();
      if (msg.includes("frame=")) {
        process.stdout.write(msg); // Fortschritt live ausgeben
      }
      stderr += msg;
    });

    ffmpeg.on("close", (code: number | null, signal: NodeJS.Signals | null) => {
      // clearTimeout(timeout);

      if (code === 0) {
        console.log("FFmpeg completed successfully");
        resolve({
          success: true,
          outputPath,
        });
      } else {
        const errorMsg =
          signal === "SIGABRT"
            ? `FFmpeg aborted (SIGABRT) - likely missing dependencies. Check if x265 is properly installed.\nError: ${stderr}`
            : `FFmpeg failed: code ${code}, signal ${signal}\n${stderr}`;

        console.error(errorMsg);
        // Statt den kompletten stderr zu rejecten, was sehr lang sein kann,
        // ist es oft besser, eine präzisere Fehlermeldung zu erstellen.
        reject(
          new Error(
            `FFmpeg process exited with code ${code}. Full log: \n${stderr}`
          )
        );
      }
    });

    ffmpeg.on("error", (error: Error) => {
      console.error("FFmpeg spawn error:", error);
      // clearTimeout(timeout); // Timeout auch hier clearen
      reject(new Error(`FFmpeg spawn failed: ${error.message}`));
    });

    // // Timeout nach 10 Minuten
    // const timeout = setTimeout(() => {
    //   ffmpeg.kill("SIGTERM");
    //   // Der 'close' Event-Handler wird nach dem kill aufgerufen,
    //   // daher ist das reject() dort ausreichend.
    //   // reject(new Error('FFmpeg timeout after 10 minutes'));
    // }, 600000);
  });
};
