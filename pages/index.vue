<script setup lang="ts">
import { onMounted } from 'vue';
const { todos, active, dbNames, handleSetTodos, handleAddDB,setActive, setDbNames } = useDbCrud();
onMounted(async() => {
  await setDbNames();
})
</script>
<template>
    <div class="p-10 flex gap-10">
        <div class=" w-1/2 space-y-4">
            <button
                @click="handleAddDB" 
                class="bg-amber-500 text-white p-2 rounded"
            >Add DB</button>
            <div class="flex flex-wrap gap-10">
                <DbListing :active="active" :dbNames="dbNames">
                    <template #default="{isActive, dbName}">
                        <div @click="setActive(dbName)">
                        <DbCard :isActive="isActive"/>
                            <span
                                class="opacity-60 capitalize"
                                :class="[{'text-red-900 opacity-90': isActive}]"
                            >{{dbName}}</span> 
                        </div>   
                    </template>
                </DbListing>
            </div>
        </div>
        <div class="border-l pl-10 w-1/2">
            <div class="flex gap-x-2 items-center">
                <button
                    @click="handleSetTodos(active)"
                    class="bg-amber-500 text-white p-2 rounded"
                >Fetch Info</button>
                <span class="opacity-50 capitalize">{{ active }}</span>
            </div>
            <DbInfo :dbName="active" :info="todos"/>
        </div>
    </div>
</template>