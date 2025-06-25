<script setup lang="ts">
import DbIcon from './icons/DbIcon.vue';
defineProps<{
    isActive: boolean
}>()
</script>

<template>
    <div class="p-10 border border-gray-800 rounded cursor-pointer opacity-50 hover:opacity-75">
        <DbIcon
            class="w-10 h-10"
            :class="[{'text-red-900': isActive}]"
        />
    </div>
</template>