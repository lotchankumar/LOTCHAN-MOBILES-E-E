import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaPg } from '@prisma/adapter-pg'

const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db'

const adapter = databaseUrl.startsWith('file:') || databaseUrl.startsWith('sqlite:')
  ? new PrismaBetterSqlite3({ url: databaseUrl })
  : new PrismaPg({ connectionString: databaseUrl })

const prisma = new PrismaClient({ adapter })

export default prisma