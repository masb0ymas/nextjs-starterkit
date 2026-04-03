import { createAuthClient } from 'better-auth/react'

import { AUTH_PROVIDER } from '../constants/auth'

export const authClient = createAuthClient()

export const signInWithCognito = () => {
  return authClient.signIn.social({
    provider: AUTH_PROVIDER.COGNITO,
    callbackURL: `/dashboard`,
  })
}

export const signOut = () => {
  return authClient.signOut()
}
