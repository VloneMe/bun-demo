import { Hono } from "hono";
import { logger } from "./utils/logger";
import { errorMiddleware } from "./middlewares/error.middleware";
import { envConfig } from "./config/env";
import { createDataSource, initializeDB } from "./config/db";
import { container } from "tsyringe";
import { User } from "./entities/user.entity";
import "reflect-metadata";
import { serveStatic } from "hono/bun";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { DataSource } from "typeorm";

// Log startup
logger.info(`🚀 Starting in ${envConfig.NODE_ENV} mode`);

// Initialize database
const dataSource = createDataSource(envConfig);
await initializeDB(dataSource);

// Create Hono app
const app = new OpenAPIHono();

// Middlewares
app.use("*", errorMiddleware);
app.use("/static/*", serveStatic({ root: "./" }));

// Security headers middleware
app.use("*", async (ctx, next) => {
  ctx.header("X-Content-Type-Options", "nosniff");
  ctx.header("X-Frame-Options", "DENY");
  ctx.header("X-XSS-Protection", "1; mode=block");
  ctx.header("Referrer-Policy", "strict-origin-when-cross-origin");
  await next();
});

// Routes

// API Documentation
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "User API",
    version: "1.0.0",
    description: "API documentation for User Service",
  },
  servers: [
    {
      url: envConfig.NODE_ENV === "production" 
        ? "https://api.example.com" 
        : `http://localhost:${envConfig.PORT}`,
      description: envConfig.NODE_ENV === "production" 
        ? "Production server" 
        : "Local development server",
    },
  ],
});

app.get("/docs", swaggerUI({ url: "/openapi.json" }));

// Health check endpoint
app.get("/health", (ctx) => {
  logger.info("Health check request received");
  return ctx.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Not found handler
app.notFound((ctx) => {
  logger.warn(`404 Not Found: ${ctx.req.path}`);
  return ctx.json({ 
    error: "Not Found",
    path: ctx.req.path,
    timestamp: new Date().toISOString(),
  }, 404);
});

// Export server configuration
export default {
  port: envConfig.PORT,
  fetch: app.fetch,
  hostname: envConfig.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
};