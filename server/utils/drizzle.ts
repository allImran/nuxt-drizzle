import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '../database/schema'
export const tables = schema

export async function useDrizzle(dbName: string) {
    const { sqliteDatabasePath } = useRuntimeConfig()
    const sqlite = new Database(sqliteDatabasePath+dbName)
    const db = drizzle(sqlite, { schema })
    return db
}

export type User = typeof schema.users.$inferSelect
export type Todo = typeof schema.todos.$inferSelect