<template>
  <div class="converter-form">
    <div class="converter-form-card">
      <div class="combobox-currency-from">
        <div class="combobox-currency">
          <CurrencySelect
            :options="conversionRates"
            v-model="baseCurrency.label"
            @option:selected="setBaseCurrency"
          />
        </div>
        <CurrencyNumericInput v-model="baseCurrency.value" @input="updateBaseValue" />
      </div>
      <div>
        <button class="converter-btn before" @click="swapCurrencies">⮂</button>
        <button class="converter-btn after" @click="swapCurrencies">⮃</button>
      </div>
      <div class="combobox-currency-to">
        <div class="currency-to">
          <CurrencySelect
            :options="conversionRates"
            v-model="targetCurrency.label"
            @option:selected="setTargetCurrency"
          />
          <CurrencyNumericInput v-model="culcResult" :readonly="true" />
        </div>
        <img src="@/assets/logo.svg" alt="logo" width="120px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'
import CurrencySelect from '@/components/UI/CurrencySelect/CurrencySelect.vue'
import CurrencyNumericInput from '@/components/UI/CurrencyNumericInput/CurrencyNumericInput.vue'
import { onMounted } from 'vue'

const {
  conversionRates,
  baseCurrency,
  targetCurrency,
  setBaseCurrency,
  setTargetCurrency,
  swapCurrencies,
  loadRates,
  updateBaseValue,
  culcResult,
} = useCurrency()

onMounted(async () => {
  await loadRates()
})
</script>

<style scoped>
.converter-form {
  display: flex;
  place-content: center;
  padding: 40px 0;
}
.converter-form-card {
  display: flex;
  justify-content: space-between;
  width: 750px;
  border-radius: 10px;
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.251);
  min-height: 450px;
  background: var(--cc--color-bg);
  padding: 40px;
}
.combobox-currency-from {
  width: 300px;
  gap: 20px;
  display: flex;
  flex-direction: column;
}
.currency-to {
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
}
.combobox-currency-to {
  width: 300px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.combobox-currency {
  border-radius: 10px;
  width: 100%;
}
.converter-btn {
  border: none;
  background-color: transparent;
  color: var(--cc-color-base);
  font-size: 30px;
  cursor: pointer;
  content: 'aaa';
}

.converter-btn.before {
  display: block;
}
.converter-btn.after {
  display: none;
}

@media (max-width: 860px) {
  .converter-form-card {
    align-items: center;
    flex-direction: column;
  }
  .converter-btn.before {
    display: none;
  }
  .converter-btn.after {
    display: block;
  }
}
</style>
