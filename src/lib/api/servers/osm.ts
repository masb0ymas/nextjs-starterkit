'use server'

import { AxiosRequestConfig } from 'axios'
import qs from 'qs'

import { env } from '@/config/env'

import { ServerFetchApi } from '../server-fetch'

const api = new ServerFetchApi({ baseURL: env.OSM_API_URL }).default

const reqConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.166 Safari/537.36`, // required to access the API
  },
}

async function getSearchByAddressFn(address: string) {
  try {
    const query = qs.stringify({ q: address, format: 'json', limit: 10 })
    const response = await api.get(`/search?${query}`, reqConfig)
    return response.data
  } catch (error) {
    console.log((error as Error).message)
    throw error
  }
}

export const osmServers = {
  byAddress: getSearchByAddressFn,
} as const
