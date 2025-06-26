export default eventHandler(async (event) => {
  const { title, dbName } = await readBody(event)

  const todo = (await useDrizzle(dbName)).insert(tables.todos).values({
    title,
    createdAt: new Date()
  }).returning().get()

  return todo
})
