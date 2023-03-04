import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/home')
  }else{
    signIn('keycloak', { callbackUrl: 'http://localhost:3000/home' })
  }
}
