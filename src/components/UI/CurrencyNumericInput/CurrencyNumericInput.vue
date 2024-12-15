<template>
  <div class="currency-input">
    <input
      :value="modelValue"
      class="input"
      @input="updateValue"
      type="number"
      :readonly="readonly"
      @keypress="validateInput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const updateValue = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  emit('input', inputElement.value)
}

const validateInput = (event: KeyboardEvent) => {
  const forbiddenKeys = ['e', 'E', '+', '-', ',']
  const inputElement = event.target as HTMLInputElement

  if (forbiddenKeys.includes(event.key) || inputElement.value.length > 10) {
    event.preventDefault()
  }
}
</script>

<style scoped>
.currency-input {
  width: 100%;
}
.input {
  height: 60px;
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 12px;
  outline: none;
  font-size: 20px;
  color: var(--cc-color-text-primary);
}
</style>
