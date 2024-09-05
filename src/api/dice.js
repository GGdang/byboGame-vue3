import apiHandler, { baseURL } from '@/api/api'
import { useMutation, useQuery } from '@tanstack/vue-query'

const queryKey = {
  getUserByTelegramUserId: 'getUserByTelegramUserId',
  getLeaderboard: 'getLeaderboard',
  getReferrals: 'getReferrals'
}

/*
    創建用戶

    type CreateUserDataRequest = {
    telegram_user_id: string
    telegram_username: string
    referral_code: string
    }

    type CreateUserDataResponse = {
        id: number
        telegram_user_id: string
        telegram_username: string
        total_points: number
        highest_score: number
        ton_wallet_address: string
        referral_code: string
        referred_by: string
    }
*/

export const createUserURL = `${baseURL}/users`

export const callCreateUser = async (data) => {
  return useMutation({
    mutationFn: () => apiHandler.post(createUserURL, data)
  })
}

/*
    更新用戶名稱
    type updateTelegramUserNameURLParams = {
        userId: number
    }

    type updateTelegramUserNameRequest = {
        telegram_username: string
    }

    type updateTelegramUserNameRequest = {
        message: string
    }
*/

export const updateTelegramUserNameURL = (userId) => `${baseURL}/users/${userId}/telegram-username`

export const callUpdateTelegramUserName = async (userId, data) => {
  return useMutation({
    mutationFn: () => apiHandler.post(updateTelegramUserNameURL(userId), data)
  })
}

/*
    更新積分
    type updatePointsURLParams = {
        userId: number
    }

    type updatePointsRequest = {
        points: number
    }

    type updatePointsResponse = {
        message: string
    }
*/

export const updatePointsURL = (userId) => `${baseURL}/users/${userId}/points`

export const callUpdatePoints = async (userId, data) => {
  return useMutation({
    mutationFn: () => apiHandler.post(updatePointsURL(userId), data)
  })
}

/*
    更新最高分

    type updateHighestScoreURLParams = {
        userId: number
    }

    type updateHighestScoreRequest = {
        score: number
    }

    type updateHighestScoreResponse = {
        message: string
    }
*/
export const updateHighestScoreURL = (userId) => `${baseURL}/users/${userId}/highest-score`

export const callUpdateHighestScore = async (userId, data) => {
  return useMutation({
    mutationFn: () => apiHandler.post(updateHighestScoreURL(userId), data)
  })
}

/*
    更新錢包

    type updateTonWalletAddressURLParams = {
        userId: number
    }

    type updateTonWalletAddressRequest = {
        wallet_address: string
    }

    type updateTonWalletAddressResponse = {
        message: string
    }
*/

export const updateTonWalletAddressURL = (userId) => `${baseURL}/users/${userId}/wallet`

export const callUpdateTonWalletAddress = async (userId, data) => {
  return useMutation({
    mutationFn: () => apiHandler.post(updateTonWalletAddressURL(userId), data)
  })
}

/*
    通過 Telegram 用戶 ID 取得用戶資訊
    type getUserByTelegramUserIdURLParams = {
        telegramUserId: string
    }

    type getUserByTelegramUserIdResponse = {
        id: number
        telegram_user_id: string
        telegram_username: string
        total_points: number
        highest_score: number
        ton_wallet_address: string
        referral_code: string
        referred_by: string
    }
*/

export const getUserByTelegramUserIdURL = (telegramUserId) =>
  `${baseURL}/users/telegram/${telegramUserId}`

export const callGetUserByTelegramUserId = (telegramUserId) => {
  return useQuery({
    queryKey: [queryKey.getUserByTelegramUserId, telegramUserId],
    queryFn: async () => {
      // if (!telegramUserId) return null
      console.log('--telegramUserId--', !!telegramUserId)
      const res = await apiHandler.get(getUserByTelegramUserIdURL(telegramUserId))
      return res
    },
    enabled: false
  })
}

/*
    獲取積分排行榜
    type leaderboardItem = {
        telegram_username: string
        total_points: number
    }

    type getLeaderboardResponse = leaderboardItem[]
*/

export const getLeaderboardURL = `${baseURL}/point-leaderboard`

export const callGetLeaderboard = async () => {
  return useQuery({
    queryKey: [queryKey.getLeaderboard],
    queryFn: () => apiHandler.get(getLeaderboardURL)
  })
}

/*
    獲取用戶推薦
    type getReferralsURLParams = {
        userId: number
    }
    type getReferralsResponse = {
        id: number
        referrer_id: string
        referred_id: string
    }
 */

export const getReferralsURL = (userId) => `${baseURL}/users/${userId}/referrals`

export const callGetReferrals = async (userId) => {
  return useQuery({
    queryKey: [queryKey.getReferrals, userId],
    queryFn: () => apiHandler.get(getReferralsURL(userId))
  })
}

/*
    獲得用戶推薦數量

    type getReferralsCountURLParams = {
        userId: number
    }

    type getReferralsCountResponse = {
        count: number
    }
*/

export const getReferralsCountURL = (userId) => `${baseURL}/users/${userId}/referrals_count`

export const callGetReferralsCount = async (userId) => {
  return useQuery({
    queryKey: [queryKey.getReferralsCount, userId],
    queryFn: () => apiHandler.get(getReferralsCountURL(userId))
  })
}
