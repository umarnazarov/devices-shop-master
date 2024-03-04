<template>
    <div class="login-container">
        <el-form @submit.prevent="tryLogin" class="login-form" ref="ruleFormRef" :rules="formRules" :model="loginForm"
            label-width="0">
            <h2 class="login-title">Sign In</h2>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="Username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="Password"
                    prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" :loading="isLoading"
                    class="login-button">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from "element-plus";

import { DevicesRouteName } from '@/modules/devices/routes'
import { useAuth } from '../hooks/use-auth';
import { ILoginForm } from '../types';

const router = useRouter()
const { login } = useAuth()

const isLoading = ref(false)
const ruleFormRef = ref<FormInstance>();
const loginForm = reactive<ILoginForm>({
    username: '',
    password: '',
})

const formRules = reactive<FormRules<ILoginForm>>({
    username: [
        {
            required: true,
            message: "Please input the model name",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "Please input the model name",
            trigger: "blur",
        },
    ],

});

async function tryLogin() {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            isLoading.value = true
            try {
                await login(loginForm.username, loginForm.password)
                await router.push({ name: DevicesRouteName.DEVICES })
            } catch (e: any) {
                isLoading.value = false
                ElMessage.error(e.message)
                console.error(e)
            }
        }
    });
}


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
}

.login-form {
    width: 380px;
    padding: 25px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 28px;
}

.login-button {
    width: 100%;
}
</style>