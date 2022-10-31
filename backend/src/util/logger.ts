import expressWinston from "express-winston";
import winston, { format } from "winston";

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "express.log" }),
  ],
  level: "info",
  format: format.combine(
    format.timestamp({ format: "DD/MM/YYYY HH:mm:ss.SSSS" }),
    format.printf(
      (info) =>
        `${info.level.toUpperCase().padEnd(5)} ${info.timestamp} ${info.message}`
    )
  ),
  msg: "[{{req.method}}] [{{res.statusCode}}] {{req.url}} {{res.responseTime}}ms",
});

export { logger };
