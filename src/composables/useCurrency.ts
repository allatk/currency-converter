import { reactive, ref, watch } from 'vue'
import { getCurrency } from '@/services/api/currency-api/index'
import { useFavouriteCurrencies } from '@/composables/useFavouriteCurrencies'
import type { CurrencyRateItem } from '@/services/api/currency-api/types'

const baseCurrencyData = localStorage.getItem('cc-base-rate') ?? ('EUR' as string)
const targetCurrencyData = localStorage.getItem('cc-target-rate') ?? ('BYN' as string)

const baseCurrency = reactive<CurrencyRateItem>({
  label: baseCurrencyData,
  value: 1,
})
const targetCurrency = reactive<CurrencyRateItem>({
  label: targetCurrencyData,
  value: 0,
})
const culcResult = ref(0)
const conversionRates = ref<CurrencyRateItem[]>([])

export function useCurrency() {
  const isLoaded = ref(false)

  const { getFavouriteCurrencies } = useFavouriteCurrencies()

  const sortRates = (
    rates: CurrencyRateItem[],
    favoriteCurrencies: Set<string>,
  ): CurrencyRateItem[] => {
    return rates.sort((a, b) => {
      const aIsFavorite = favoriteCurrencies.has(a.label) ? 1 : 0
      const bIsFavorite = favoriteCurrencies.has(b.label) ? 1 : 0
      return bIsFavorite - aIsFavorite
    })
  }

  const calculateTargetValue = () => {
    const targetRate =
      conversionRates.value.find((rate) => rate.label === targetCurrency.label)?.value || 1
    culcResult.value = Number((baseCurrency.value * targetRate).toFixed(5))
  }

  const loadRates = async () => {
    isLoaded.value = true

    try {
      const { data } = await getCurrency(baseCurrency.label)

      const fetchedRates = Object.entries(data.rates).map(([label, value]) => ({
        label,
        value,
      }))

      const favoriteCurrencies = getFavouriteCurrencies()
      conversionRates.value = sortRates(fetchedRates, favoriteCurrencies)

      calculateTargetValue()
    } catch (error) {
      console.error('Failed to fetch rates:', error)
    } finally {
      isLoaded.value = false
    }
  }

  const swapCurrencies = () => {
    const tempLabel = baseCurrency.label
    baseCurrency.label = targetCurrency.label
    targetCurrency.label = tempLabel
  }

  const updateBaseValue = (value: string) => {
    baseCurrency.value = Number(value)
  }

  const setBaseCurrency = (label: string) => {
    baseCurrency.label = label
  }

  const setTargetCurrency = (label: string) => {
    targetCurrency.label = label
  }

  watch(
    () => baseCurrency,
    (newBaseCurrency) => {
      localStorage.setItem('cc-base-rate', newBaseCurrency.label)
      loadRates()
    },
    { deep: true },
  )

  watch(
    () => targetCurrency.label,
    (newLabel) => {
      localStorage.setItem('cc-target-rate', newLabel)
      loadRates()
    },
  )

  return {
    conversionRates,
    baseCurrency,
    targetCurrency,
    isLoaded,
    loadRates,
    setBaseCurrency,
    setTargetCurrency,
    swapCurrencies,
    calculateTargetValue,
    updateBaseValue,
    culcResult,
  }
}
