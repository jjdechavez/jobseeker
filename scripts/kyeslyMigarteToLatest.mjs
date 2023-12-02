import 'dotenv/config'
import * as path from 'path'
import SQLite from 'better-sqlite3'
import { promises as fs } from 'fs'
import {
  Kysely,
  Migrator,
  SqliteDialect,
  FileMigrationProvider,
} from 'kysely'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrateToLatest() {
  const db = new Kysely({
    dialect: new SqliteDialect({
      database: async () => new SQLite(process.env.DATABASE_URL ?? ':memory')
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '../services/migrations/'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest();
