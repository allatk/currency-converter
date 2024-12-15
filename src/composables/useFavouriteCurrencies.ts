import { ref } from 'vue'

const favouriteData = (JSON.parse(localStorage.getItem('cc-favourites')!) ?? []) as string[]
const favouriteCurrencies = ref<Set<string>>(new Set(favouriteData))

export function useFavouriteCurrencies() {
  function isCurrencyFavourite(currencyCode: string): boolean {
    return favouriteCurrencies.value.has(currencyCode)
  }

  const toggleFavourite = (currencyCode: string) => {
    if (favouriteCurrencies.value.has(currencyCode)) {
      favouriteCurrencies.value.delete(currencyCode)
    } else {
      favouriteCurrencies.value.add(currencyCode)
    }
    localStorage.setItem('cc-favourites', JSON.stringify([...favouriteCurrencies.value]))
  }

  const getFavouriteCurrencies = () => {
    return [...favouriteCurrencies.value]
  }

  return {
    isCurrencyFavourite,
    toggleFavourite,
    getFavouriteCurrencies,
    favouriteCurrencies,
  }
}
