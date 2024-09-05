import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      user: {
        id: 0,
        telegram_user_id: '',
        telegram_username: '',
        total_points: 0,
        highest_score: 0,
        ton_wallet_address: '',
        referral_code: '',
        referred_by: 0
      }
    }
  },
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
