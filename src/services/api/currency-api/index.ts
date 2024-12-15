import type { CurrencyResponse } from '@/services/api/currency-api/types'
import { apiClient } from '@/services/configs/api-client'
import type { AxiosResponse } from 'axios'

const getCurrency = async (baseCurrency: string): Promise<AxiosResponse<CurrencyResponse>> => {
  const data = await apiClient.get<CurrencyResponse>(baseCurrency)

  return data
}

export { getCurrency }
