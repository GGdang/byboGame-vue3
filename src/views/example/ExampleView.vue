<script setup>
/*
    要特別注意的是 store 是個 reactive 建立的物件，
    所以不能直接對 store 進行解構，
    如需要解構，可以使用 storeToRefs 進行解構。
    import { storeToRefs } from 'pinia'
    const { count } = storeToRefs(exampleStore)
*/
import { useExampleStore } from '@/store/example'

const exampleStore = useExampleStore()

const addCount = () => {
  /*
    可以透過直接對 store 內的 state 做操作
    可以透過 pinia 的 action 去執行
*/
  exampleStore.increment()
  // exampleStore.count++
}

const resetCount = () => {
  exampleStore.$reset()
}
</script>
<template>
  <div>
    <p>Example</p>
    <h3>Pinia store:</h3>
    <p>Count: {{ exampleStore.count }}</p>
    <p>Double Count: {{ exampleStore.double }}</p>

    <v-btn @click="addCount"> add </v-btn>
    <v-btn @click="resetCount"> reset </v-btn>
  </div>
</template>
<style lang="scss"></style>
