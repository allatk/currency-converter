<template>
  <div class="currency-list-container">
    <div class="currency-list-title">
      <div class="currency-list-setting-panel">
        <div class="currency-list-combobox">
          <CurrencySelect
            :options="conversionRates"
            v-model="baseCurrency.label"
            @option:selected="setBaseCurrency"
            style="background: #dee3e7; border: none"
          />
        </div>
        <button class="update-rates-btn" @click="loadRates">↺</button>
      </div>
    </div>
    <ul class="currency-list" v-if="conversionRates.length > 0">
      <div v-for="item in conversionRates" :key="item.label">
        <CurrencyItem :rate="item"></CurrencyItem>
      </div>
    </ul>
    <CurrencyLoader v-if="isLoaded" />
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'
import CurrencyItem from '@/components/CurrencyItem/CurrencyItem.vue'
import CurrencySelect from '@/components/UI/CurrencySelect/CurrencySelect.vue'
import CurrencyLoader from '@/components/UI/CurrencyLoader/CurrencyLoader.vue'
import { onMounted } from 'vue'

const { conversionRates, baseCurrency, setBaseCurrency, loadRates, isLoaded } = useCurrency()

onMounted(async () => {
  await loadRates()
})
</script>

<style scoped>
.currency-list-container {
  position: relative;
  min-height: 660px;
}
.currency-list {
  width: 100%;
  padding: 15px;
  overflow-y: auto;
  max-height: 600px;
}
.currency-list-title {
  height: 62px;
  background: var(--cc--color-bg);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.currency-list-setting-panel {
  display: flex;
  place-content: space-between;
}
.currency-list-combobox {
  width: 160px;
  margin-left: 2px;
  margin-top: 1px;
}
.update-rates-btn {
  border: none;
  background-color: transparent;
  color: var(--cc-color-base);
  font-size: 30px;
  cursor: pointer;
  content: 'aaa';
  margin-right: 15px;
  height: 60px;
}
</style>
