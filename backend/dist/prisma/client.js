"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const adapter_pg_1 = require("@prisma/adapter-pg");
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = databaseUrl.startsWith('file:') || databaseUrl.startsWith('sqlite:')
    ? new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url: databaseUrl })
    : new adapter_pg_1.PrismaPg({ connectionString: databaseUrl });
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
//# sourceMappingURL=client.js.map