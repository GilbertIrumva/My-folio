import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const MONGODB_URI = process.env.MONGODB_URI;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || GMAIL_USER;

export {
  PORT,
  CLIENT_ORIGIN,
  MONGODB_URI,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECEIVER_EMAIL,
};
