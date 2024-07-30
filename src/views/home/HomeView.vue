<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const gotoStartGamePage = () => {
  router.push('/start')
}
</script>

<template>
  <main class="h-100">
    <h1 class="text-center">Cybo Game</h1>
    <div class="d-flex flex-column align-center justify-center">
      <v-btn class="bg-blue" @click="gotoStartGamePage"> Start </v-btn>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import url('./HomeView.scss');
</style>
