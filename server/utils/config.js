import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const normalize = (value) =>
  typeof value === "string" ? value.trim() : value;

const normalizeAppPassword = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, "") : value;

const PORT = process.env.PORT || 5000;
const MONGODB_URI = normalize(process.env.MONGODB_URI);
const GMAIL_USER = normalize(process.env.GMAIL_USER);
const GMAIL_APP_PASSWORD = normalizeAppPassword(process.env.GMAIL_APP_PASSWORD);
const CONTACT_RECEIVER_EMAIL =
  normalize(process.env.CONTACT_RECEIVER_EMAIL) || GMAIL_USER;

export {
  PORT,
  MONGODB_URI,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECEIVER_EMAIL,
};
