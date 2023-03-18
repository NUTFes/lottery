import { signOut } from 'next-auth/react'

export const logout = async (mode: 'admin' | 'user'): Promise<void> => {
  await signOut({ redirect: false })

  const path = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.CSR_VIEW_URI}/${mode}/auth&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_ID}`

  window.location.href = path
}
