const CYBO_GAME_HISTORY_STORAGE_KEY = 'cyboGameHistory'

export const getHistoryStorage = () => {
  const historyStorage = localStorage.getItem(CYBO_GAME_HISTORY_STORAGE_KEY)
  if (!historyStorage) {
    return null
  }
  return JSON.parse(historyStorage)
}

export const setHistoryStorage = (data) => {
  localStorage.setItem(CYBO_GAME_HISTORY_STORAGE_KEY, JSON.stringify(data))
}
