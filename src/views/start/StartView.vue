<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { canRollFourth, calculateScore } from '@/lib/gameLogic'
const router = useRouter()
const nowRound = ref(1)
const totalScore = ref(0)
const nowRoundScore = ref(0)
const nowRoundDiceScore = ref(['-', '-', '-'])
const prevDiceScore = ref([])
const scoreTypeShow = ref('')
const diceGrid = ref([1, 5, 9, 2, 6, 10, 3, 7, 11, 4, 8, 12])
const goHome = () => {
  router.push('/')
}

const resetTurn = () => {
  scoreTypeShow.value = ''
  nowRoundScore.value = 0
}

const endTurn = () => {
  nowRound.value = 1
  totalScore.value = 0
  nowRoundScore.value = 0
  nowRoundDiceScore.value = ['-', '-', '-']
  scoreTypeShow.value = ''
  prevDiceScore.value = []
}

const rollDice = () => {
  if (nowRound.value + 1 > 13) {
    endTurn()
  } else {
    resetTurn()
    nowRound.value++
  }
  const atTimeRollScore = Array(3)
    .fill()
    .map(() => Math.floor(Math.random() * 12) + 1)

  nowRoundDiceScore.value = atTimeRollScore

  const { roundScore, scoreType } = calculateScore(nowRoundDiceScore.value, prevDiceScore.value)
  scoreTypeShow.value = scoreType
  nowRoundScore.value = roundScore
  prevDiceScore.value = [...prevDiceScore.value, atTimeRollScore]
  totalScore.value = totalScore.value + roundScore
  //   if (nowRoundDiceScore.value.length ===3 && canRollFourth(nowRoundDiceScore.value)) {

  //   }
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
    <div class="d-flex w-100">
      <v-col :key="`dice-${index}`" v-for="(item, index) in nowRoundDiceScore" cols="4">
        <div class="wd-20 ht-20 border border-md rounded-lg d-flex justify-center align-center">
          <span class="text-h4">
            {{ item }}
          </span>
        </div>
      </v-col>
    </div>
    <div class="d-flex w-100">
      <v-col cols="6">
        <v-btn color="green-lighten-4" @click="rollDice"> ROLL DICE </v-btn>
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
  </main>
</template>

<style lang="scss" scoped>
@import url('./StartView.scss');
</style>
