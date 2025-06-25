<script setup lang="ts">
defineProps<{
    dbNames: string[]
    active: string
}>()
</script>
<template>
    <template v-for="(dbName, index) in dbNames" :key="index">
        <slot :dbName="dbName" :isActive="dbName === active" :index="index"/>
    </template>
</template>