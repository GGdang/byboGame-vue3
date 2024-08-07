<script setup>
import { ref, onMounted, computed } from 'vue'
import TonConnect from '@tonconnect/sdk'
import TonWeb from 'tonweb'

const walletAddress = ref('')
const error = ref('')
let connector

const formattedAddress = computed(() => {
  if (walletAddress.value) {
    return new TonWeb.utils.Address(walletAddress.value).toString(true, true, true)
  }
  return ''
})

const nonBounceableAddress = computed(() => {
  if (walletAddress.value) {
    return new TonWeb.utils.Address(walletAddress.value).toString(true, true, false)
  }
  return ''
})

const rawAddress = computed(() => {
  if (walletAddress.value) {
    return new TonWeb.utils.Address(walletAddress.value).toString(false, false, false)
  }
  return ''
})

const connectWallet = async () => {
  console.log('Connecting wallet')
  try {
    const walletConnectionSource = {
      universalLink: 'https://app.tonkeeper.com/ton-connect',
      bridgeUrl: 'https://bridge.tonapi.io/bridge'
    }

    const url = await connector.connect(walletConnectionSource)

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  } catch (e) {
    console.error('Failed to connect wallet:', e)
    error.value = e.message
  }
}

const disconnectWallet = async () => {
  console.log('Disconnecting wallet')
  try {
    await connector.disconnect()
    walletAddress.value = ''
  } catch (e) {
    console.error('Failed to disconnect wallet:', e)
    error.value = e.message
  }
}

const restoreConnection = async () => {
  try {
    await connector.restoreConnection()
  } catch (e) {
    console.error('Failed to restore connection:', e)
  }
}

const returnToTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.close()
  }
}

onMounted(() => {
  console.log('TelegramButton mounted')
  connector = new TonConnect({
    manifestUrl: 'https://solomeowl.github.io/twa-vue-example/tonconnect-manifest.json'
  })

  connector.onStatusChange((walletInfo) => {
    if (walletInfo) {
      walletAddress.value = walletInfo.account.address
      console.log('Wallet connected:', walletAddress.value)
      returnToTelegram()
    } else {
      walletAddress.value = ''
      console.log('Wallet disconnected')
    }
  })

  restoreConnection()
})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
