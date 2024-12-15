<template>
  <div class="app-wrapper">
    <ConverterHeader />
    <ConverterNavbar />
    <div class="container">
      <RouterView />
    </div>
    <ConverterFooter />
  </div>
</template>

<script setup lang="ts">
import ConverterHeader from '@/components/ConverterHeader/ConverterHeader.vue'
import ConverterNavbar from '@/components/ConverterNavbar/ConverterNavbar.vue'
import ConverterFooter from '@/components/ConverterFooter/ConverterFooter.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  flex: 1;
}
</style>
