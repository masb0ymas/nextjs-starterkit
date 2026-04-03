import 'server-only'

import axios, { AxiosError, AxiosInstance } from 'axios'
import { isEmpty } from 'lodash'
import { headers } from 'next/headers'

import { auth } from '../auth/auth-server'
import { getAccessToken } from '../auth/handler'
import { AUTH_STORAGE_KEYS } from '../constants/auth'
import { ms } from '../date'

const timeout = ms('5m')

interface CreateAxiosProps {
  baseURL: string
  storageKey?: string
}

/**
 * Create axios instance
 * @param params
 * @returns
 */
function createAxios({ baseURL, storageKey }: CreateAxiosProps) {
  const axiosInstance = axios.create({ baseURL, timeout })

  // Interceptor Request
  if (storageKey && !isEmpty(storageKey)) {
    axiosInstance.interceptors.request.use(async (config) => {
      const currentConfig = { ...config }

      const session = await auth.api.getSession({
        headers: await headers(),
      })

      // Check Session if exists
      if (session) {
        const data = await getAccessToken()

        try {
          currentConfig.headers.Authorization = `Bearer ${data?.accessToken}`
        } catch (error) {
          console.error(error)
        }
      }

      return currentConfig
    })
  }

  // Interceptor Response
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error')
      }

      if (error.response?.status === 401) {
        if (storageKey === AUTH_STORAGE_KEYS.AUTH_STORAGE) {
          // TODO: handle refresh token
        }
        throw new Error('Unauthorized')
      }

      if (error.response?.status === 403) {
        throw new Error('Forbidden')
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

/**
 * Fetch API
 * @example
 * const fetchApi = new ServerFetchApi({ baseURL: 'https://api.example.com', storageKey: 'token' }).default
 * fetchApi.get('/users')
 */
export class ServerFetchApi {
  private _axiosInstance: AxiosInstance | null
  private readonly _baseURL: string
  private readonly _storageKey?: string

  constructor({ baseURL, storageKey }: CreateAxiosProps) {
    this._axiosInstance = null
    this._baseURL = baseURL
    this._storageKey = storageKey
  }

  public get default(): AxiosInstance {
    if (!this._axiosInstance) {
      this._axiosInstance = createAxios({
        baseURL: this._baseURL,
        storageKey: this._storageKey,
      })

      return this._axiosInstance
    }

    return this._axiosInstance
  }
}
