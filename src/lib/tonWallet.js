import { ref, computed } from 'vue'
import TonConnect from '@tonconnect/sdk'
import TonWeb from 'tonweb'

let connector = ref(null)
export let walletAddress = ref('')

export const formattedAddress = computed(() => {
  if (walletAddress.value !== '') {
    return new TonWeb.utils.Address(walletAddress.value).toString(true, true, true)
  }
  return ''
})

export const nonBounceableAddress = computed(() => {
  if (walletAddress.value !== '') {
    return new TonWeb.utils.Address(walletAddress.value).toString(true, true, false)
  }
  return ''
})

export const rawAddress = computed(() => {
  if (walletAddress.value !== '') {
    return new TonWeb.utils.Address(walletAddress.value).toString(false, false, false)
  }
  return ''
})

const returnToTelegram = () => {
  console.log(1)
  if (window.Telegram && window.Telegram.WebApp) {
    console.log(2)
    window.Telegram.WebApp.close()
  }
}

const restoreConnection = async () => {
  try {
    await connector.value.restoreConnection()
  } catch (e) {
    console.error('Failed to restore connection:', e)
  }
}

// 假設這是一個初始化 Connector 的異步函數
async function initializeConnector() {
  console.log('TelegramButton mounted')
  connector.value = new TonConnect({
    manifestUrl: 'https://solomeowl.github.io/twa-vue-example/tonconnect-manifest.json'
  })

  connector.value.onStatusChange((walletInfo) => {
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
}

export const useConnectWallet = async () => {
  if (connector.value === null) {
    console.error('Connector init failed')
    return
  }

  try {
    const walletConnectionSource = {
      universalLink: 'https://app.tonkeeper.com/ton-connect',
      bridgeUrl: 'https://bridge.tonapi.io/bridge'
    }

    const url = await connector.value.connect(walletConnectionSource)

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  } catch (e) {
    console.error('Failed to connect wallet:', e)
  }
}

export const useDisconnectWallet = async () => {
  console.log('Disconnecting wallet')
  try {
    await connector.value.disconnect()
    walletAddress.value = 'disconnect'
  } catch (e) {
    console.error('Failed to disconnect wallet:', e)
  }
}

// 在模塊導入時初始化 connector
;(async () => {
  try {
    await initializeConnector()
    console.log('Connector initialized:', connector.value)
  } catch (error) {
    console.error('Failed to initialize connector:', error)
  }
})()
