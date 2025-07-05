// export default eventHandler(async () => {
//   const drizzle = useDrizzle()
//   const todos = await drizzle
//   return todos.select().from(tables.todos).all()
// })

import { json } from "drizzle-orm/gel-core"

export default defineEventHandler(async (event) => {
  const ev = await readBody(event)
  const dbName = JSON.parse(ev)?.dbName
  console.log(JSON.parse(ev))
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
      todos: null,
      req: dbName
    }
  }
})
