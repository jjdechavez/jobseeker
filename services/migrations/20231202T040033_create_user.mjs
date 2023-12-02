import { Kysely, sql } from 'kysely'

/**
 * @param {Kysely<any>} db
 * @return {Promise<void>}
 */
export async function up(db) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('avatar_url', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()
}

/**
 * @param {Kysely<any>} db
 * @return {Promise<void>}
 */
export async function down(db) {
  await db.schema.dropTable('user').execute()
}
