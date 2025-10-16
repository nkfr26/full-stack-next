import { config } from "dotenv";
import * as z from "zod";

config({ path: ".env" });

const envSchema = z.object({ DB_FILE_NAME: z.string() });

export const env = envSchema.parse(process.env);
