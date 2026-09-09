<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goPostApi } from '../api/auth'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const username = ref('admin')
const nickname = ref('管理员')
const password = ref('123456')
const captcha = ref('')
const captchaCode = ref('')
const loading = ref(false)
const errorMessage = ref('')

function refreshCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  captchaCode.value = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  captcha.value = ''
}

async function handleLogin() {
  errorMessage.value = ''

  if (!nickname.value.trim()) {
    errorMessage.value = '请输入昵称'
    return
  }

  if (!captcha.value.trim()) {
    errorMessage.value = '请输入验证码'
    return
  }

  if (captcha.value.trim().toUpperCase() !== captchaCode.value) {
    errorMessage.value = '验证码错误'
    refreshCaptcha()
    return
  }

  loading.value = true

  try {
    await authStore.login(username.value.trim(), password.value, nickname.value.trim())
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } catch (error) {
    refreshCaptcha()
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message ?? '登录请求失败，请稍后重试'
    } else {
      errorMessage.value = error instanceof Error ? error.message : '登录失败'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
  void goPostApi({
    userName: 'xiaoming',
    age: 18,
    address: { city: '深圳', road: '罗湖区' },
  }).catch((error) => {
    console.error('goPost 请求失败', error)
  })
})
</script>

<template>
  <main class="login-page">
    <el-form class="login-card" label-position="top" @submit.prevent="handleLogin">
      <div class="logo">V</div>
      <h1>欢迎登录</h1>
      <p class="subtitle">登录后进入 HelloWorld 页面</p>

      <el-form-item label="用户名">
        <el-input
          v-model="username"
          name="username"
          autocomplete="username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>

      <el-form-item label="昵称">
        <el-input
          v-model="nickname"
          name="nickname"
          autocomplete="nickname"
          placeholder="请输入昵称"
          clearable
        />
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          v-model="password"
          name="password"
          type="password"
          autocomplete="current-password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <el-form-item label="验证码">
        <div class="captcha-row">
          <el-input
            v-model="captcha"
            name="captcha"
            maxlength="4"
            placeholder="请输入验证码"
            clearable
          />
          <button
            class="captcha-code"
            type="button"
            title="点击刷新验证码"
            @click="refreshCaptcha"
          >
            {{ captchaCode }}
          </button>
        </div>
      </el-form-item>

      <el-alert
        v-if="errorMessage"
        class="error"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
      />

      <el-button class="login-button" type="primary" native-type="submit" :loading="loading">
        登录
      </el-button>

      <p class="hint">演示账号：admin / 123456</p>
      <div class="public-links">
        <RouterLink to="/about">关于我们</RouterLink>
        <RouterLink to="/help">帮助中心</RouterLink>
      </div>
    </el-form>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at top left, rgba(170, 59, 255, 0.2), transparent 38%),
    var(--bg);
}

.login-card {
  width: min(380px, 100%);
  padding: 40px;
  text-align: left;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  box-sizing: border-box;
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin: 0 auto;
  color: #fff;
  font-weight: 700;
  background: var(--accent);
  border-radius: 14px;
}

h1 {
  margin: 20px 0 4px;
  text-align: center;
  font-size: 30px;
}

.subtitle,
.hint {
  text-align: center;
  color: var(--text);
}

.subtitle {
  margin-bottom: 28px;
}

.captcha-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.captcha-code {
  flex: none;
  width: 108px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(170, 59, 255, 0.08),
      rgba(170, 59, 255, 0.08) 6px,
      transparent 6px,
      transparent 12px
    ),
    #f7f5ff;
  color: var(--accent);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4px;
  cursor: pointer;
}

.login-button {
  width: 100%;
  margin-top: 24px;
}

.error {
  margin-top: 14px;
}

.hint {
  margin-top: 16px;
  font-size: 13px;
}

.public-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
}

.public-links a {
  color: var(--accent);
  font-size: 14px;
  text-decoration: none;
}
</style>
