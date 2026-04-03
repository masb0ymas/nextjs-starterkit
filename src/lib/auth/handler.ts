import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_PROVIDER } from '../constants/auth'
import { auth } from './auth-server'

/**
 * Require authentication and redirect to home page if not authenticated
 */
export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const google = await getAccessToken()

  return { ...session, data: google }
}

/**
 * Get current session
 * @returns Session object or null if not authenticated
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return null
  }

  const google = await getAccessToken()

  return { ...session, data: google }
}

/**
 * Get access token for Google provider
 * @returns Access token object with provider information
 */
export async function getAccessToken() {
  const google = await auth.api.getAccessToken({
    body: { providerId: AUTH_PROVIDER.GOOGLE },
    headers: await headers(),
  })

  return { ...google, provider: AUTH_PROVIDER.GOOGLE }
}
