<script setup>
import { RouterView } from 'vue-router'
import eruda from 'eruda'
import { TonConnectUIProvider, THEME } from '@townsquarelabs/ui-vue'
eruda.init()
const options = {
  manifestUrl: 'https://ggdang.github.io/byboGame-vue3/tonconnect-manifest.json',
  uiPreferences: { theme: THEME.DARK },
  walletsListConfiguration: {
    includeWallets: [
      // {
      //   appName: 'safepalwallet',
      //   name: 'SafePal',
      //   imageUrl: 'https://s.pvcliping.com/web/public_image/SafePal_x288.png',
      //   tondns: '',
      //   aboutUrl: 'https://www.safepal.com',
      //   universalLink: 'https://link.safepal.io/ton-connect',
      //   jsBridgeKey: 'safepalwallet',
      //   bridgeUrl: 'https://ton-bridge.safepal.com/tonbridge/v1/bridge',
      //   platforms: ['ios', 'android', 'chrome', 'firefox'],
      // },
      // {
      //   appName: 'tonwallet',
      //   name: 'TON Wallet',
      //   imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
      //   aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
      //   universalLink: 'https://wallet.ton.org/ton-connect',
      //   jsBridgeKey: 'tonwallet',
      //   bridgeUrl: 'https://bridge.tonapi.io/bridge',
      //   platforms: ['chrome', 'android'],
      // },
    ]
  },
  actionsConfiguration: {
    twaReturnUrl: 'https://t.me/miniapptest2_bot'
  }
}
</script>

<template>
  <TonConnectUIProvider :options="options">
    <RouterView />
  </TonConnectUIProvider>
</template>

<style lang="scss" scoped>
#app {
  justify-content: center;
  flex-direction: column;
}
</style>
