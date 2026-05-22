import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const databaseUrl =
  process.env.PRISMA_USE_DIRECT_URL === "1"
    ? process.env.DIRECT_URL
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL ou DIRECT_URL nao encontrada");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
