import MobileLayout from '@/components/MobileLayout'
import type { NextPage } from 'next'
import Odometer from '@/components/OdometerMini'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {
  const socketRef = useRef<WebSocket>()
  const [randomMessage, setRandomMessage] = useState('')

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws')

    socketRef.current.onmessage = function (event) {
      let json = JSON.parse(event.data)
      if (json.client == 'Random') {
        setRandomMessage(json.message)
      }
    }

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef.current.close()
    }
  }, [])
  return (
    <>
      <MobileLayout>
        <Odometer value={randomMessage} />
      </MobileLayout>
    </>
  )
}

export default Home
