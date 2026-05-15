import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
  process.env.PRISMA_USE_DIRECT_URL === "1"
    ? process.env.DIRECT_URL
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL ou DIRECT_URL não encontrada");
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
