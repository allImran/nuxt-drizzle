<script setup lang="ts">
defineProps<{
    dbName: string
    info?: any
}>()
</script>

<template>
    <div>
        <!-- <div>
            <h1>{{dbName}}</h1>
        </div> -->
        <div>
            <code>{{info}}</code>
        </div>
    </div>
</template>
