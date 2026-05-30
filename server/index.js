import mongoose from "mongoose";
import app from "./app.js";
import { MONGODB_URI, PORT, GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_RECEIVER_EMAIL } from "./utils/config.js";
import logger from "./utils/logger.js";

const INITIAL_RETRY_DELAY_MS = 3000;
const MAX_RETRY_DELAY_MS = 30000;

let serverStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWithRetry = async () => {
  let attempt = 1;
  let retryDelay = INITIAL_RETRY_DELAY_MS;

  while (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      logger.info("MongoDB connected successfully.");
      return;
    } catch (error) {
      logger.error(
        `MongoDB connection failed (attempt ${attempt}). Retrying in ${retryDelay / 1000}s...`,
        error
      );
      await wait(retryDelay);
      retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS);
      attempt += 1;
    }
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected. Mongoose will keep trying to reconnect.");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected.");
});

const startServer = async () => {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_RECEIVER_EMAIL) {
    logger.warn("Gmail notifier is not fully configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_RECEIVER_EMAIL.");
  }

  if (!serverStarted) {
    app.listen(PORT, () => {
      logger.info(`Backend running at http://localhost:${PORT}`);
    });
    serverStarted = true;
  }

  if (!MONGODB_URI) {
    logger.warn("MONGODB_URI is missing. Starting API without database persistence; email delivery can still work.");
    return;
  }

  connectWithRetry().catch((error) => {
    logger.error("Unexpected MongoDB retry loop failure:", error);
  });
};

startServer();
