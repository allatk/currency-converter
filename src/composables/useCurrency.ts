import { reactive, ref } from 'vue'
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

  const loadRates = async () => {
    isLoaded.value = true

    try {
      const { data } = await getCurrency(baseCurrency.label)

      const fetchedRates = Object.entries(data.rates).map(([label, value]) => ({
        label,
        value,
      }))

      const favoriteCurrencies = new Set(getFavouriteCurrencies())
      conversionRates.value = sortRates(fetchedRates, favoriteCurrencies)
    } catch (error) {
      console.error('Failed to fetch rates:', error)
    } finally {
      isLoaded.value = false
      calculateTargetValue()
    }
  }

  const swapCurrencies = () => {
    const tempLabel = baseCurrency.label
    baseCurrency.label = targetCurrency.label
    localStorage.setItem('cc-base-rate', baseCurrency.label)
    targetCurrency.label = tempLabel
    localStorage.setItem('cc-target-rate', targetCurrency.label)
    loadRates()
  }

  const calculateTargetValue = () => {
    const targetRate =
      conversionRates.value.find((rate) => rate.label === targetCurrency.label)?.value || 1
    culcResult.value = Number((baseCurrency.value * targetRate).toFixed(3))
  }

  const updateBaseValue = (value: string) => {
    baseCurrency.value = Number(value)
    loadRates()
  }

  const setBaseCurrency = (label: string) => {
    if (baseCurrency.label !== label) {
      baseCurrency.label = label
      localStorage.setItem('cc-base-rate', baseCurrency.label)
    }
    loadRates()
  }

  const setTargetCurrency = (label: string) => {
    if (targetCurrency.label !== label) {
      targetCurrency.label = label
      localStorage.setItem('cc-target-rate', targetCurrency.label)
    }
    loadRates()
  }

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
