<script setup>
const props = defineProps(['title', 'buttonColor', 'buttonGradient', 'titleColor', 'onPress'])
</script>

<template>
  <div @click="onPress" class="wt-75 ht-15 rounded-lg cursor-pointer" :class="[props.buttonColor]">
    <div
      class="w-100 ht-14 rounded-lg d-flex justify-center align-center"
      :class="[props.buttonGradient]"
    >
      <p class="fw-9 fs-4 font-baloo">{{ props.title }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
