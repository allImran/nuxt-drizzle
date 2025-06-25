export default defineEventHandler((event) => {
  const { names } = getDbNameInfo();

  return {
      status: 200,
      message: 'Found',
      names
    };
})