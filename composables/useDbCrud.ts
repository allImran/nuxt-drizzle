import { ref } from 'vue';

export const useDbCrud = () => {
  const dbNames = ref<string[]>([]);
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
    handleAddDB
  }
}