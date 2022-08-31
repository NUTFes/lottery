import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const Websocket: NextPage = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)
  const [sentMessage, setSentMessage] = useState('')
  const [randomMessage, setRandomMessage] = useState('')
  const [hostMessage, setHostMessage] = useState('')

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws')
    socketRef.current.onopen = function () {
      setIsConnected(true)
      console.log('Connected')
    }

    socketRef.current.onclose = function () {
      console.log('closed')
      setIsConnected(false)
    }

    socketRef.current.onmessage = function (event) {
      let json = JSON.parse(event.data)
      console.log('message')
      setSentMessage(event.data)
      if (json.place_id == 1 && json.client == 'Random') {
        setRandomMessage(json.message)
      }
      if (json.place_id == 1 && json.client == 'Host') {
        setHostMessage(json.message)
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
      <h1>WebSocket is connected : {`${isConnected}`}</h1>
      <h3>sent message: {sentMessage}</h3>
      <h3>random message: {randomMessage}</h3>
      <h3>host message: {hostMessage}</h3>
    </>
  )
}

export default Websocket
