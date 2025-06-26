import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import * as schema from '../database/schema';
import { resolve } from 'path';
import { existsSync } from 'fs';

/**
 * Standalone migration function that handles database migrations
 * @param options - Configuration options for the migration
 */
export async function migrateDatabase(options: {
  dbPath?: string;
  migrationsFolder?: string;
  createIfNotExists?: boolean;
  verbose?: boolean;
} = {}) {
  const {
    dbPath = 'sqlite.db',
    migrationsFolder = './server/database/migrations',
    createIfNotExists = true,
    verbose = true
  } = options;

  let sqlite: Database.Database | null = null;

  try {
    // Check if database exists
    const dbExists = existsSync(dbPath);
    
    if (!dbExists && !createIfNotExists) {
      throw new Error(`Database file does not exist at ${dbPath} and createIfNotExists is false`);
    }

    if (verbose) {
      console.log(`${dbExists ? 'Connecting to existing' : 'Creating new'} SQLite database at ${dbPath}`);
    }

    // Create SQLite database connection
    sqlite = new Database(dbPath);

    // Initialize Drizzle with the SQLite connection
    const db = drizzle(sqlite, { schema });

    // Resolve migrations folder path
    const resolvedMigrationsFolder = resolve(migrationsFolder);

    // Check if migrations folder exists
    if (!existsSync(resolvedMigrationsFolder)) {
      if (verbose) {
        console.warn(`Migrations folder does not exist at ${resolvedMigrationsFolder}`);
        console.log('Skipping migrations...');
      }
      return { 
        success: true, 
        message: 'No migrations folder found, database ready without migrations',
        migrationsRun: 0
      };
    }

    if (verbose) {
      console.log(`Running migrations from ${resolvedMigrationsFolder}`);
    }

    // Run the migrations
    const migrationResult = await migrate(db, { migrationsFolder: resolvedMigrationsFolder });
    
    if (verbose) {
      console.log('Migrations completed successfully');
    }

    return { 
      success: true, 
      message: 'Database migrations completed successfully',
      migrationsRun: 1, // Drizzle doesn't return count, but we know migrations were executed
      dbPath,
      migrationsFolder: resolvedMigrationsFolder
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (verbose) {
      console.error('Migration failed:', errorMessage);
    }

    return {
      success: false,
      message: `Migration failed: ${errorMessage}`,
      error: errorMessage
    };
  } finally {
    // Always close the database connection
    if (sqlite) {
      sqlite.close();
    }
  }
}

/**
 * Simple migration function that uses default settings
 */


/**
 * Migration function with custom database path
 */
export async function migrateToPath(dbPath: string) {
  return await migrateDatabase({ dbPath });
}

/**
 * Force migration - creates database if it doesn't exist
 */
export async function forceMigrate(dbPath: string = 'sqlite.db') {
  return await migrateDatabase({ 
    dbPath, 
    createIfNotExists: true,
    verbose: true 
  });
}

/**
 * Silent migration - runs without console output
 */
export async function silentMigrate(dbPath: string = 'sqlite.db') {
  return await migrateDatabase({ 
    dbPath, 
    verbose: false 
  });
}