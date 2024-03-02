<template>
    <router-link :to="`/${item.href}`">
        <div>{{ item.name }}</div>
    </router-link>
</template>

<script setup lang="ts">
import type { IMainMenuItem } from '@/common/layouts/components/nav-bar/types/'

defineProps<{ item: IMainMenuItem }>()
</script>

<style scoped></style>