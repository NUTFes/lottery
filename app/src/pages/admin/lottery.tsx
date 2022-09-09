import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import LotteryLayout from '@/components/LotteryLayout'
import Odometer from '@/components/Odometer'
import { get } from '@/utils/api_methods'

type User = {
  id: number
  number: string
  updated_at: string
  created_at: String
}

type Props = {
  users: User[]
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/random'
  const json = await get(getUrl)
  return {
    props: {
      users: json,
    },
  }
}

const Lottery: NextPage<Props> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users)
  const [formMessage, setFormMessage] = useState('77777777')
  const socketRef = useRef<WebSocket>()
  const [randomMessage, setRandomMessage] = useState('')

  const sendData = (event: any) => {
    event.preventDefault()
    setFormMessage(event.target[0].value)
    socketRef.current?.send(JSON.stringify({ client: 'Random', message: event.target[0].value }))
  }

  useEffect(() => {
    socketRef.current = new WebSocket(process.env.WS_API_URI)

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
    <LotteryLayout>
      {users.map((user) => (
        <>
          <Odometer value={formMessage}></Odometer>
          <form onSubmit={sendData}>
            <input type="text" name="socketData" value={user.number} className="text-sm" />
            <button type="submit" className="text-sm">
              push
            </button>
          </form>
        </>
      ))}
    </LotteryLayout>
  )
}

export default Lottery
