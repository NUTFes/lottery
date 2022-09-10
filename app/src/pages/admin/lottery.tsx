import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import LotteryLayout from '@/components/LotteryLayout'
import Odometer from '@/components/Odometer'
import LotteryButton from '@/components/Button/LotteryButton'
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
  const socketRef = useRef<WebSocket>()
  const [randomMessage, setRandomMessage] = useState('')
  const [isLottery, setIsLottery] = useState(false)

  const sendData = () => {
    setRandomMessage(users[0].number)
    socketRef.current?.send(JSON.stringify({ client: 'Random', message: users[0].number }))
    setIsLottery(true)
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
          {isLottery ? (
            <Odometer value={randomMessage}></Odometer>
          ) : (
            <LotteryButton className={'w-100 px-96'} onClick={sendData}>
              Click to Start
            </LotteryButton>
          )}
        </>
      ))}
    </LotteryLayout>
  )
}

export default Lottery
