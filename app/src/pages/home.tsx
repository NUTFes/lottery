import { useSession } from 'next-auth/react'
import QRCode from 'react-qr-code'
import Card from '@mui/material/Card'

export default function Home() {
  const { data: session } = useSession()
  console.log('session', session)
  return (
    <>
      {session?.user.id || 'no id'}
      <Card sx={{ height: 'auto', margin: '0 auto', maxWidth: 64, width: '100%' }}>
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={session?.user.id || 'no id'}
          viewBox={`0 0 256 256`}
        />
      </Card>
    </>
  )
}
