import { envConfig } from "../config/env";

const logLevels = ["error", "warn", "info", "debug"] as const;
type LogLevel = typeof logLevels[number];

const shouldLog = (level: LogLevel): boolean => {
  const currentLevelIndex = logLevels.indexOf(
    (envConfig.NODE_ENV === "production" ? "info" : "debug") as LogLevel
  );
  return logLevels.indexOf(level) <= currentLevelIndex;
};

interface Logger {
  error: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  info: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;
}

export const logger: Logger = {
  error: (message, meta) => {
    if (shouldLog("error")) {
      console.error(`[ERROR] ${message}`, meta || "");
    }
  },
  warn: (message, meta) => {
    if (shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, meta || "");
    }
  },
  info: (message, meta) => {
    if (shouldLog("info")) {
      console.info(`[INFO] ${message}`, meta || "");
    }
  },
  debug: (message, meta) => {
    if (shouldLog("debug")) {
      console.debug(`[DEBUG] ${message}`, meta || "");
    }
  },
};