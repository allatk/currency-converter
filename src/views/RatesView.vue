<template>
  <div class="rate-page">
    <div class="rate-card">
      <CurrencyList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyList from '@/components/CurrencyList/CurrencyList.vue'
</script>

<style>
.rate-page {
  display: flex;
  place-content: center;
  padding: 40px 0;
}
.rate-card {
  width: 750px;
  border-radius: 10px;
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.251);
  min-height: 600px;
}
</style>
