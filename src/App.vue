<template>
  <div class="app-wrapper">
    <ConverterHeader />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ConverterHeader from './components/ConverterHeader.vue'
</script>

<style scoped>
.app-wrapper {
  width: 100%;
}
</style>
