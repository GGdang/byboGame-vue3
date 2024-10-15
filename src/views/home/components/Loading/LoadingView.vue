<script setup>
import { ref } from 'vue'
const loadingContent = ref([
  { content: 'C', color: '' },
  { content: 'I', color: '' },
  { content: 'N', color: '' },
  { content: 'O', color: '' }
])
</script>

<template>
  <div class="phone-size">
    <div class="d-flex flex-column align-center">
      <div class="ht-20"></div>
      <p class="text-center fw-9 fs-10">TON</p>
      <div>
        <div
          :key="`loading-content-${item.content}`"
          v-for="item in loadingContent"
          class="fw-9 fs-8 lh-6"
        >
          <p>
            {{ item.content }}
          </p>
          <div class="mb-2"></div>
        </div>
      </div>
      <div class="ht-20"></div>
      <div class="fs-4 font-baloo">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
