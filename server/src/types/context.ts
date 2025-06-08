// types/context.ts
import type { Context } from "hono";
import type { InputToDataByTarget } from "hono/types";
import { z, type ZodType } from "zod";

export type AppVariables = {
  userId?: number;
};

export type AppEnv = {
  Variables: AppVariables;
};

export type AppContext = Context<AppEnv>;

export type ValidatedContext<Schema extends ZodType> = AppContext & {
  req: {
    valid: {
      <T extends "json">(target: T): InputToDataByTarget<{
        json: z.infer<Schema>;
      }, T>;
    } & {
      (type: "json"): z.infer<Schema>;
    };
  };
  json: (data: any) => Response;
};