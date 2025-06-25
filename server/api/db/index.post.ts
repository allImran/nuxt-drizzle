import { eventHandler } from 'h3';
/**
 * API endpoint to generate a new SQLite database file
 * POST /api/generate-db
 */
export default eventHandler(async () => {
  const { sqliteDatabasePath } = useRuntimeConfig();
  try {
    const { name } = getDbNameInfo();
    const result = await generateDatabase(sqliteDatabasePath+name);
    return result;
  } catch (error) {
    console.error('Database generation error:', error);
    return {
      success: false,
      message: 'Failed to generate database',
      error: error instanceof Error ? error.message : String(error)
    };
  }
});