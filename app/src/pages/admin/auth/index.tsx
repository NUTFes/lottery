import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/admin')
    } else {
      signIn('keycloak', { callbackUrl: `${process.env.CSR_VIEW_URI}/admin` })
    }
  }, [session, router])
}
