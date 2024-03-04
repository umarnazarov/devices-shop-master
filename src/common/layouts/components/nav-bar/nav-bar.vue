<template>
    <nav class="navbar">
        <div class="navbar__brand">
            <router-link to="/" class="navbar__item">
                Admin Panel
            </router-link>
        </div>
        <div class="navbar__menu">
            <ul>
                <li v-for="menu in MainMenuItems" :key="menu.name">
                    <MainMenuItem :item="menu" />
                </li>
            </ul>
            <el-button type="primary" @click="logout">
                Logout
            </el-button>
        </div>
    </nav>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import { MainMenuItems } from '@/common/consts/main-menu-items'
import MainMenuItem from '@/common/layouts/components/nav-bar/components/main-menu-item.vue'

import { useAuth } from '@/modules/auth/hooks/use-auth';

const router = useRouter();
const { logOut } = useAuth()

const logout = () => {
    logOut()
    router.push('/sign-in');
};

</script>

<style scoped lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem;
    border-bottom: 1px solid #e7e7e7;

    &__brand {
        font-size: 1.2rem;
    }

    &__menu {
        display: flex;
        align-items: center;
        gap: 1rem
    }

    &__item {
        display: block;
        color: #000;
        cursor: pointer;
    }

    &__item:hover,
    .active {
        color: #409eff;
    }
}
</style>
