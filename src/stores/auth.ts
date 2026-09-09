import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '../api/auth'

const TOKEN_KEY = 'demo-token'
const USERNAME_KEY = 'demo-username'
const NICKNAME_KEY = 'demo-nickname'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')
  const username = ref(localStorage.getItem(USERNAME_KEY) ?? '')
  const nickname = ref(localStorage.getItem(NICKNAME_KEY) ?? '')
  const isLoggedIn = computed(() => Boolean(token.value))

  async function login(account: string, password: string, displayName: string) {
    const result = await loginApi({ username: account, password, nickname: displayName })

    token.value = result.token
    username.value = result.username
    nickname.value = result.nickname
    localStorage.setItem(TOKEN_KEY, result.token)
    localStorage.setItem(USERNAME_KEY, result.username)
    localStorage.setItem(NICKNAME_KEY, result.nickname)
  }

  function logout() {
    token.value = ''
    username.value = ''
    nickname.value = ''
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(NICKNAME_KEY)
  }

  return { token, username, nickname, isLoggedIn, login, logout }
})
