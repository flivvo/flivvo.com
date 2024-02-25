import { defineConfig } from "drizzle-kit";
import { DATABASE_PREFIX } from "@/lib/constants";

export default defineConfig({
  driver: "pg",
  schema: "./src/server/db/schema.ts",
  out: "./migrations",
  tablesFilter: [`${DATABASE_PREFIX}_*`],
});
