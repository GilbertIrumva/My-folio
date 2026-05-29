import cors from "cors";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import contactController from "./controllers/contact.js";
import middleware from "./utils/middleware.js";
import { CLIENT_ORIGIN } from "./utils/config.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const distIndexPath = path.join(distPath, "index.html");

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/api/health", contactController.healthCheck);
app.get("/api/contacts", contactController.getContacts);
app.post("/api/contact", contactController.createContactMessage);

if (existsSync(distIndexPath)) {
	app.use(express.static(distPath));

	app.get("/{*path}", (req, res, next) => {
		if (req.path.startsWith("/api")) {
			return next();
		}

		return res.sendFile(distIndexPath);
	});
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
