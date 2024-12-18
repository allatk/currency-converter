<template>
  <li class="currency-item">
    <div class="currency-item-code">{{ rate.label }}</div>
    <div class="currency-item-value">{{ rate.value }}</div>
    <button class="currency-item-btn" @click="toggleFavourite(rate.label)">
      <div
        :style="{
          color: isCurrencyFavourite(rate.label) ? '#FFD700' : '',
        }"
      >
        ★
      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
import { useFavouriteCurrencies } from '@/composables/useFavouriteCurrencies'
import type { CurrencyRateItem } from '@/services/api/currency-api/types'

defineProps({
  rate: {
    type: Object as () => CurrencyRateItem,
    default: () => {},
  },
})

const { toggleFavourite, isCurrencyFavourite } = useFavouriteCurrencies()
</script>

<style scoped>
.currency-item {
  display: flex;
  place-content: space-between;
  width: 100%;
  border-bottom: var(--color-border-item);
  padding: 0 12px;
}
.currency-item-code,
.currency-item-value {
  width: 80px;
  display: flex;
  place-items: center;
  padding-left: 5px;
}
.currency-item-btn {
  color: var(--cc-color-item);
  font-size: 28px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 40px;
}
</style>
