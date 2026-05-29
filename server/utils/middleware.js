import logger from "./logger.js";

const requestLogger = (req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
};

const errorHandler = (error, _req, res, _next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  }

  return res.status(500).json({ error: "Internal server error" });
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
