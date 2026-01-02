import { env } from "@/common/utils/envConfig"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "../../generated/prisma/client"

const adapter = new PrismaBetterSqlite3({
    url: env.DATABASE_URL
})

const prisma = new PrismaClient({ adapter })

export { prisma }