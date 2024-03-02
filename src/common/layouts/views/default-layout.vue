<template>
    <div class="default-layout">
        <NavBar />
        <div>
            <router-view />
        </div>
    </div>
</template>

<script lang="ts" setup>
import NavBar from '@/common/layouts/components/nav-bar/nav-bar.vue'

</script>

<style lang="scss" scoped></style>