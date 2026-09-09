<script setup lang="ts">
import { useRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <header class="home-header">
    <span>欢迎，{{ authStore.nickname || authStore.username }}</span>
    <el-button type="primary" @click="handleLogout">退出登录</el-button>
  </header>
  <HelloWorld />
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}

</style>
