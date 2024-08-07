<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  useConnectWallet,
  useDisconnectWallet,
  walletAddress,
  formattedAddress,
  nonBounceableAddress,
  rawAddress
} from '@/lib/tonWallet'
import TonWallet from '@/components/TonWallet.vue'
const telegramUserInfo = ref({})
const router = useRouter()

const gotoStartGamePage = () => {
  router.push('/start')
}
onMounted(() => {
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
    <div>
      <v-btn @click="useConnectWallet"> Tonkeeper Wallet Connect </v-btn>
    </div>
    <div class="py-5">
      <p>walletAddress: {{ walletAddress }}</p>
      <p>formattedAddress: {{ formattedAddress }}</p>
      <p>nonBounceableAddress: {{ nonBounceableAddress }}</p>
      <p>rawAddress: {{ rawAddress }}</p>
    </div>
    <div>
      <v-btn @click="useDisconnectWallet"> Tonkeeper Wallet Disconnect </v-btn>
    </div>
    <div class="ht-10"></div>
    <TonWallet></TonWallet>
  </main>
</template>

<style lang="scss" scoped>
@import url('./HomeView.scss');
</style>
