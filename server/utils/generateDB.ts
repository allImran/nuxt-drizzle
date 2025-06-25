import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

/**
 * Generate a new SQLite database file with automatic directory creation
 * This function creates the directory if it doesn't exist, then creates the database file
 */
export async function generateDatabase(dbPath: string) {
  // Check if database already exists
  const dbExists = existsSync(dbPath);
  
  if (!dbExists) {
    console.log(`Creating new SQLite database at ${dbPath}`);
    
    // Get the directory path from the full database path
    const dbDirectory = dirname(dbPath);
    
    // Create the directory if it doesn't exist
    if (!existsSync(dbDirectory)) {
      console.log(`Creating directory: ${dbDirectory}`);
      mkdirSync(dbDirectory, { recursive: true });
    }
    
    // Create a new SQLite database file (file is created when Database is instantiated)
    const sqlite = new Database(dbPath);
    sqlite.close();
    
    console.log('Database file created successfully');
    return { success: true, message: 'New SQLite database file created successfully' };
  } else {
    console.log(`SQLite database already exists at ${dbPath}`);
    return { success: true, message: 'SQLite database file already exists' };
  }
}