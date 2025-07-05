import { ref } from 'vue';

export const useDbCrud = () => {
  const dbNames = ref<string[]>([]);
  const todos = ref<any[]>([]);
  const active = ref<string>('');

  const setDbNames = async() => {
    const res = await fetch('/api/db')
    dbNames.value = (await res.json()).names;
  }

  const setActive = (dbName: string) => {
    active.value = dbName;
  }

  const addDb = async() => {
    return await fetch('/api/db', {
      method: 'POST',
    })
  }

  const getTodosByDbName = async(dbName: string) => {
    return await fetch('/api/todos/all', {
      method: 'POST',
      body: JSON.stringify({
        dbName
      })
    })
  }

  const handleSetTodos = async(dbName: string) => {
    if(!dbName) {
      alert('Please select a db');
      return;
    }
    const res = await getTodosByDbName(dbName);
    todos.value = (await res.json()).todos;
  }

  const handleAddDB = async() => {
    const res = await addDb();
    if ((await res.json() as any)?.success) {
      await setDbNames();
    }
  }
  return {
    dbNames,
    active,
    setActive,
    setDbNames,
    handleAddDB,
    handleSetTodos,
    todos
  }
}