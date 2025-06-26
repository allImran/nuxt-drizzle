// export default eventHandler(async () => {
//   const drizzle = useDrizzle()
//   const todos = await drizzle
//   return todos.select().from(tables.todos).all()
// })

export default defineEventHandler(async (event) => {
  const { dbName } = await readBody(event)
  
  if(dbName) {
    const drizzle = await useDrizzle(dbName)
    const todos = drizzle.select().from(tables.todos).all()
    return {
      status: 200,
      todos,
    }
  } else {
    return {
      status: 401,
      todos: null
    }
  }
})
