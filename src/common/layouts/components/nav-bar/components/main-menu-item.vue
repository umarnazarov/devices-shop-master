<template>
    <router-link to="/devices" class="navbar-item" active-class="active">
        Devices
    </router-link>
</template>

<script setup lang="ts">
import type { IMainMenuItem } from '@/common/layouts/components/nav-bar/types/'

defineProps<{ item: IMainMenuItem }>()
</script>

<style scoped></style>