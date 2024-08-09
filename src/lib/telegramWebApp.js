const TWA = window.Telegram?.WebApp

export const initTelegramWebApp = () => {
  console.log('Initializing Telegram Web App')
  TWA?.ready()
}

export const closeTelegramWebApp = () => {
  console.log('Closing Telegram Web App')
  TWA?.close()
}

export const expandTelegramWebApp = () => {
  console.log('Expanding Telegram Web App')
  TWA?.expand()
}
