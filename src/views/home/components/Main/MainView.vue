<script setup>
import AppButtons from '@/components/AppButtons.vue'
import { ref } from 'vue'
const userScoreInfo = ref([
  {
    title: 'Best Score',
    score: '100000'
  },
  {
    title: 'Total Score',
    score: '100000'
  },
  {
    title: 'Total Games Played',
    score: '99'
  }
])
const onStart = () => {
  alert('onStart')
}
const onConnectWallet = () => {
  alert('onConnectWallet')
}
</script>

<template>
  <div class="phone-size">
    <div class="d-flex h-screen flex-column justify-center align-center">
      <img class="wt-10" src="@/assets/images/TONcino.svg" alt="logo-icon" />
      <div class="ht-1"></div>
      <p class="fs-3 fw-9">TONcino</p>
      <div class="ht-10"></div>
      <div class="text-center" v-for="i in userScoreInfo" :key="`${i.title}-${i.score}`">
        <p class="text-primary-100 fs-2 fw-6">{{ i.title }}</p>
        <p class="fs-4 fw-6 lh-5">{{ i.score }}</p>
        <div class="ht-6"></div>
      </div>
      <div>
        <AppButtons
          class="text-primary-200"
          buttonColor="bg-primary-300"
          buttonGradient="liner-gradient-yellow"
          title="Start"
          :onPress="onStart"
        ></AppButtons>
        <div class="ht-5"></div>
        <AppButtons
          buttonColor="bg-primary-400"
          buttonGradient="liner-gradient-blue"
          title="Connect Wallet"
          :onPress="onConnectWallet"
        ></AppButtons>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
