import { readdirSync, existsSync } from 'fs';
import { extname } from 'path';

/**
 * Check how many database files exist in a folder and generate a new unique name
 * @param folderPath - The folder path to check for database files (default: 'db')
 * @param fileExtension - The database file extension to look for (default: '.db')
 * @param baseName - The base name for the database files (default: 'database')
 * @returns Object containing the new database name and array of existing names
 */
export const getDbNameInfo =(
  folderPath: string = 'db',
  fileExtension: string = '.db',
  baseName: string = 'database'
) => {
  if (!existsSync(folderPath)) {
    return {
      name: `${baseName}${fileExtension}`,
      names: []
    }
  }
  try {
    const files = readdirSync(folderPath);
    const dbFiles = files.filter(file => 
      extname(file).toLowerCase() === fileExtension.toLowerCase()
    )
    const matchingDbFiles = dbFiles.filter(file => {
      const nameWithoutExt = file.replace(fileExtension, '');
      return nameWithoutExt === baseName || 
             nameWithoutExt.match(new RegExp(`^${baseName}\\d+$`));
    })
    matchingDbFiles.sort()
    let newName: string;
    if (matchingDbFiles.length === 0) {
      newName = `${baseName}${fileExtension}`;
    } else {
      newName = `${baseName}${matchingDbFiles.length + 1}${fileExtension}`;
    }

    return {
      name: newName,
      names: matchingDbFiles
    };

  } catch (error) {
    console.error(`Error reading directory ${folderPath}:`, error);
    // Return default values if there's an error
    return {
      name: `${baseName}${fileExtension}`,
      names: []
    };
  }
}