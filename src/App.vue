<script setup>
import { RouterView } from 'vue-router'
import eruda from 'eruda'
eruda.init()
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
#app {
  justify-content: center;
  flex-direction: column;
}
</style>
