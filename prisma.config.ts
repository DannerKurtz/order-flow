import { defineConfig as ormConfig } from "@prisma/orm-postgres/config"
import "dotenv/config"
import { definePrismaConfig } from "prisma/config"

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/database/prisma/contract.prisma",

    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),
})
