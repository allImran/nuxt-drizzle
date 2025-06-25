import { ref } from 'vue';

export const getDbNameInfo = () => {
  const dbNames = ref<string[]>([]);
  const active = ref<string>('');
  const setDbNames = async() => {
    const res = await fetch('/api/db')
    dbNames.value = (await res.json()).names;
  }
  const setActive = (dbName: string) => {
    active.value = dbName;
  }
  return {
    dbNames,
    active,
    setActive,
    setDbNames
  }
}