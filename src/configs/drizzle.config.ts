import "dotenv/config";
import type { Config } from "drizzle-kit";
import dbConfig from "configs/db.json";

export default {
  schema: "./src/models/schema.ts",
  out: "./src/models/drizzle",
  driver: "mysql2",
  introspect: {
    casing: "camel",
  },
  dbCredentials: {
    user: dbConfig.user,
    password: process.env.DB_PASSWORD || "",
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.db_name,
  },
} satisfies Config;
