import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Component() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/admin/auth')
  }, [router])
}
