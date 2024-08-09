<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { initTelegramWebApp } from '@/lib/telegramWebApp'
const telegramUserInfo = ref({})
const router = useRouter()

const gotoStartGamePage = () => {
  router.push('/start')
}
onMounted(() => {
  try {
    initTelegramWebApp()
  } catch (e) {
    console.error('Failed to initialize Telegram WebApp:', e)
  }
  const params = new URLSearchParams(window?.Telegram?.WebApp?.initData)
  const userData = Object.fromEntries(params)
  if (Object.keys(userData).length > 0) {
    telegramUserInfo.value = JSON.parse(userData.user)
  }
})
</script>

<template>
  <main class="h-100">
    <h1 class="text-center">Cybo Game</h1>
    <div class="d-flex flex-column align-center justify-center">
      <v-btn class="bg-blue" @click="gotoStartGamePage"> Start </v-btn>
    </div>
    <div>
      <p>
        {{ telegramUserInfo }}
      </p>
    </div>
    <div class="ht-10"></div>
  </main>
</template>

<style lang="scss" scoped>
@import url('./HomeView.scss');
</style>
