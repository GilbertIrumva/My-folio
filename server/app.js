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
const distCandidates = [
	path.resolve(__dirname, "dist"),
	path.resolve(__dirname, "../dist"),
];
const distPath = distCandidates.find((candidate) =>
	existsSync(path.join(candidate, "index.html"))
);
const distIndexPath = distPath ? path.join(distPath, "index.html") : null;

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/api/health", contactController.healthCheck);
app.get("/api/contacts", contactController.getContacts);
app.post("/api/contact", contactController.createContactMessage);

if (distPath && distIndexPath) {
	app.use(express.static(distPath));

	app.get("/{*path}", (req, res, next) => {
		if (req.path.startsWith("/api")) {
			return next();
		}

		return res.sendFile(distIndexPath);
	});
} else {
	app.get("/", (_req, res) => {
		res.json({
			ok: true,
			message: "API is running. Frontend build files were not found on this instance.",
		});
	});
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
