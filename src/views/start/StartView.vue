<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { canRollFourth, calculateScore } from '@/lib/gameLogic'
import { getHistoryStorage, setHistoryStorage } from '@/lib/localStorage'
const router = useRouter()
const nowRound = ref(0)
const totalScore = ref(0)
const nowRoundScore = ref(0)
const nowRoundDiceScore = ref(['-', '-', '-'])
const nowHighestScore = ref(0)
const prevDiceScore = ref([])
const scoreTypeShow = ref('')
const canRollFourthDice = ref(false)
const askRollFourthDiceDialog = ref(false)
const endRollRoundDialog = ref(false)
const showEndScoreContent = ref({
  thisRoundScore: 0,
  thisRoundHighScore: 0,
  averageScore: 0,
  gamesPlayed: 0,
  highestSingleGameScore: 0
})
const diceGrid = ref([1, 5, 9, 2, 6, 10, 3, 7, 11, 4, 8, 12])
const goHome = () => {
  router.push('/')
}

const resetTurn = () => {
  scoreTypeShow.value = ''
  nowRoundScore.value = 0
  if (nowRoundDiceScore.value.length === 4) {
    nowRoundDiceScore.value = ['-', '-', '-']
  }
}

const openGameEndDialog = () => {
  const gameHistoryInfo = getHistoryStorage()
  const showScoreboard = {
    thisRoundScore: totalScore.value,
    thisRoundHighScore: nowHighestScore.value,
    averageScore: 0,
    gamesPlayed: 0,
    highestSingleGameScore: 0
  }
  if (!gameHistoryInfo) {
    setHistoryStorage({
      gamesPlayed: 1,
      highestSingleGameScore: totalScore.value
    })
    showScoreboard.averageScore = totalScore.value
    showScoreboard.gamesPlayed = 1
    showScoreboard.highestSingleGameScore = totalScore.value
  } else {
    const gamesPlayed = gameHistoryInfo.gamesPlayed
    const highestSingleGameScore =
      gameHistoryInfo.highestSingleGameScore > totalScore.value
        ? gameHistoryInfo.highestSingleGameScore
        : totalScore.value
    setHistoryStorage({
      gamesPlayed: gamesPlayed + 1,
      highestSingleGameScore: highestSingleGameScore
    })
    showScoreboard.gamesPlayed = gamesPlayed
    showScoreboard.highestSingleGameScore = highestSingleGameScore
  }
  showEndScoreContent.value = showScoreboard
  endRollRoundDialog.value = true
}

const endTurn = () => {
  endRollRoundDialog.value = false
  nowRound.value = 1
  totalScore.value = 0
  nowRoundScore.value = 0
  nowRoundDiceScore.value = ['-', '-', '-']
  scoreTypeShow.value = ''
  prevDiceScore.value = []
  nowHighestScore.value = 0
  showEndScoreContent.value = {
    thisRoundScore: 0,
    thisRoundHighScore: 0,
    averageScore: 0,
    gamesPlayed: 0,
    highestSingleGameScore: 0
  }
}

const rollDice = () => {
  if (nowRoundDiceScore.value.length === 3 || nowRoundDiceScore.value[3] !== '-') {
    resetTurn()
    nowRound.value++
  }

  const atTimeRollScore =
    nowRoundDiceScore.value.length === 3
      ? Array(3)
          .fill()
          .map(() => Math.floor(Math.random() * 12) + 1)
      : Math.floor(Math.random() * 12) + 1

  if (nowRoundDiceScore.value.length === 3) {
    nowRoundDiceScore.value = atTimeRollScore
  } else if (nowRoundDiceScore.value.length === 4) {
    nowRoundDiceScore.value[3] = atTimeRollScore
  }

  const { roundScore, scoreType } = calculateScore(nowRoundDiceScore.value, prevDiceScore.value)
  scoreTypeShow.value = scoreType
  nowRoundScore.value = roundScore
  nowHighestScore.value = nowHighestScore.value < roundScore ? roundScore : nowHighestScore.value
  totalScore.value = totalScore.value + roundScore
  if (nowRoundDiceScore.value.length === 3) {
    prevDiceScore.value = [...prevDiceScore.value, atTimeRollScore]
  } else if (nowRoundDiceScore.value.length === 4) {
    prevDiceScore.value[prevDiceScore.value.length - 1] = nowRoundDiceScore.value
  }
  if (nowRoundDiceScore.value.length === 3 && canRollFourth(nowRoundDiceScore.value)) {
    askRollFourthDiceDialog.value = true
  }
}

const switchFourthDialog = (status) => {
  canRollFourthDice.value = status
  askRollFourthDiceDialog.value = false
  if (status) {
    nowRoundDiceScore.value = [...nowRoundDiceScore.value, '-']
    totalScore.value = totalScore.value - nowRoundScore.value
    nowRoundScore.value = 0
  }
}
</script>

<template>
  <main class="h-100 pa-2 d-flex flex-column align-center">
    <h1>CYBO</h1>
    <p>Round: {{ nowRound }}/13</p>
    <p>Total Score: {{ totalScore }}</p>
    <p>Current Round Score: {{ nowRoundScore }}</p>
    <p>Score Type: {{ scoreTypeShow }}</p>

    <div class="ht-10"></div>
    <div class="d-flex justify-center w-100">
      <v-col :key="`dice-${index}`" v-for="(item, index) in nowRoundDiceScore" cols="3">
        <div class="wd-15 ht-15 border border-md rounded-lg d-flex justify-center align-center">
          <span class="text-h4">
            {{ item }}
          </span>
        </div>
      </v-col>
    </div>
    <div class="d-flex w-100">
      <v-col v-if="nowRound < 13" cols="6">
        <v-btn color="green-lighten-4" @click="rollDice"> ROLL DICE </v-btn>
      </v-col>
      <v-col v-if="nowRound === 13" cols="6">
        <v-btn color="green-lighten-4" @click="openGameEndDialog"> End this round </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn color="red-darken-3" @click="goHome"> GO TO HOME </v-btn>
      </v-col>
    </div>
    <v-row class="w-100 border" no-gutters>
      <v-col cols="4" :key="`dice-grid-${item}`" v-for="item in diceGrid">
        <div
          class="diceGrid border w-100 h-100 d-flex justify-center align-center"
          :class="{ active: nowRoundDiceScore.includes(item) }"
        >
          <span class="diceGridContent">
            {{ item }}
          </span>
        </div>
      </v-col>
    </v-row>
    <div class="ht-10"></div>
  </main>
  <v-dialog v-model="askRollFourthDiceDialog" width="auto">
    <v-card
      max-width="350"
      persistent
      title="Would you like to challenge the fourth die?"
      text="If you succeed in the challenge, you will earn 16 points. If you fail, you will only earn 3 points."
    >
      <template v-slot:actions>
        <v-btn @click="switchFourthDialog(false)"> Disagree </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="switchFourthDialog(true)"> Agree </v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog persistent v-model="endRollRoundDialog" width="auto">
    <v-card class="pa-3" max-width="350" persistent>
      <v-card-title> Scoreboard </v-card-title>
      <div class="px-5">
        <p class="mb-1">Your score is: {{ showEndScoreContent.thisRoundScore }}</p>
        <p class="mb-1">High Score:{{ showEndScoreContent.thisRoundHighScore }}</p>
        <p class="mb-1">Games Played: {{ showEndScoreContent.gamesPlayed }}</p>
        <p class="mb-1">
          Highest Single Game Score:{{ showEndScoreContent.highestSingleGameScore }}
        </p>
      </div>
      <div class="ht-5"></div>
      <div class="d-flex">
        <v-btn color="green-lighten-4" @click="endTurn"> Paly Again </v-btn>
        <div class="wt-4"></div>
        <v-btn color="red-darken-3" @click="goHome"> Go to Home </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import url('./StartView.scss');
</style>
