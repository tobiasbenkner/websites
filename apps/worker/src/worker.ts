import { initializeVideoWorker } from "./jobs/video-queue";

const startWorker = async () => {
  initializeVideoWorker();
};

startWorker().catch((err) => {
  console.error("Failed to start worker:", err);
  process.exit(1);
});
