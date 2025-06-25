export default eventHandler(async () => {
  const drizzle = useDrizzle()
  const todos = await drizzle
  return todos.select().from(tables.todos).all()
})
