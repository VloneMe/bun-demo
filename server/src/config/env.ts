import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5500),
  DB_HOST: z.string().default("13.60.79.108"),
  DB_PORT: z.coerce.number().default(5431),
  DB_USERNAME: z.string().default("randei"),
  DB_PASSWORD: z.string().default("randei20+20"),
  DB_NAME: z.string().default("randeiappdb"),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGINS: z.string().default("*"),
});

// Export the type separately
export type EnvConfig = z.infer<typeof envSchema>;

// Export the validated config as a constant
export const envConfig: EnvConfig = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
      process.exit(1);
    }
    throw error;
  }
})();