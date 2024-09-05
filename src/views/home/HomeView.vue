<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { initTelegramWebApp } from '@/lib/telegramWebApp'
import { TonConnectButton, useTonWallet, useTonAddress } from '@townsquarelabs/ui-vue'
import { useGlobalStore } from '@/store/global'
import { callCreateUser, callGetUserByTelegramUserId } from '@/api/dice'
const props = defineProps(['referralCode'])

const globalStore = useGlobalStore
const telegramUserInfo = ref({
  id: 611381021,
  first_name: 'Hardy',
  last_name: 'Hao',
  username: 'HardyHao',
  language_code: 'zh-hans',
  allows_write_to_pm: true
})
const size = ref({
  width: 0,
  height: 0
})
const userFriendlyAddress = useTonAddress()
const rawAddress = useTonAddress(false)
const wallet = useTonWallet()
const router = useRouter()
const isNotTelegramOpenDialog = ref(false)
const { refetch: getUserByTelegramUserId } = callGetUserByTelegramUserId()

const isDev = computed(() => {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'development'
})

const gotoStartGamePage = async () => {
  if (telegramUserInfo.value.id || isDev) {
    // const res = await callCreateUser.mutateAsync({
    //   telegram_user_id: telegramUserInfo.value.id,
    //   telegram_username: telegramUserInfo.value.username,
    //   referral_code: props.referralCode ? props.referralCode : ''
    // })
    // console.log('--callCreateUser--', res)
    // globalStore.user = res.data
    router.push('/start')
  } else {
    isNotTelegramOpenDialog.value = true
  }
}

onMounted(async () => {
  console.log('--window--', window)
  size.value.width = window.innerWidth
  size.value.height = window.innerHeight
  // try {
  //   console.log('telegram')
  //   initTelegramWebApp()
  // } catch (e) {
  //   console.error('Failed to initialize Telegram WebApp:', e)
  // }
  // const params = new URLSearchParams(window?.Telegram?.WebApp?.initData)
  // const userData = Object.fromEntries(params)
  // if (Object.keys(userData).length > 0) {
  //   telegramUserInfo.value = JSON.parse(userData.user)
  // }

  try {
    if (telegramUserInfo.value?.id) {
      const res = await getUserByTelegramUserId()
      console.log('--res--', res)
    }
  } catch (error) {
    console.log(error)
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
      <p>{{ size }}</p>
      <p>{{ telegramUserInfo }}</p>
    </div>
    <div class="ht-10"></div>
    <div>
      <TonConnectButton className="custom-class" :styles="{ color: 'red' }"> </TonConnectButton>
    </div>
    <div v-if="wallet">
      <div>Connected Wallet: {{ wallet.name }}</div>
      <div>Device: {{ wallet.device.appName }}</div>
      <div>User-friendly address: {{ userFriendlyAddress }}</div>
      <div>Raw address: {{ rawAddress }}</div>
    </div>
    <v-dialog persistent v-model="isNotTelegramOpenDialog" width="auto">
      <v-card class="pa-3" max-width="350" persistent>
        <div class="px-5">
          <p>請用 telegram 開啟遊戲</p>
        </div>
        <div class="ht-5"></div>
        <div class="d-flex justify-center">
          <v-btn color="green-lighten-4" @click="isNotTelegramOpenDialog = false"> Close </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </main>
</template>

<style lang="scss" scoped>
@import url('./HomeView.scss');
</style>
