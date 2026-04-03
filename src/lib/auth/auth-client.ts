import { createAuthClient } from 'better-auth/react'

import { AUTH_PROVIDER } from '../constants/auth'
import { LOCALE } from '../constants/i18n'

export const authClient = createAuthClient()

export const signInWithCognito = (locale: LOCALE) => {
  return authClient.signIn.social({
    provider: AUTH_PROVIDER.COGNITO,
    callbackURL: `/${locale}/dashboard`,
  })
}

export const signOut = () => {
  return authClient.signOut()
}
