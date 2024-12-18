<template>
  <div class="currency-select">
    <v-select
      :options="options"
      :model-value="modelValue"
      @option:selected="handleChange"
      :clearSearchOnSelect="true"
      :clearable="false"
    >
    </v-select>
  </div>
</template>

<script setup lang="ts">
import type { CurrencyRateItem } from '@/services/api/currency-api/types'
import 'vue-select/dist/vue-select.css'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => CurrencyRateItem[],
    required: true,
  },
})

const emit = defineEmits(['option:selected'])

const handleChange = (option: CurrencyRateItem) => {
  emit('option:selected', option.label)
}
</script>

<style>
.currency-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background: white;
  font-size: 20px;
  border-radius: 5px;
}
.vs__dropdown-toggle {
  height: 60px;
  border: none;
}
.vs__dropdown-menu {
  font-size: 1rem;
}
:root {
  --vs-dropdown-option--active-bg: var(--cc-color-base-light);
  --vs-dropdown-option--active-color: var(--cc-color-text-primary);
  --vs-selected-color: var(--cc-color-text-primary);
  --vs-dropdown-max-height: 300px;
}
</style>
