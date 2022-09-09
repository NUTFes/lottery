import type { NextPage } from 'next'
import { useEffect, useRef, useState, useCallback } from 'react'
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

// 遅延を設定
function useDelay(time: number) {
  return useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }, [time]);
}

const Lottery: NextPage<Props> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users)
  const socketRef = useRef<WebSocket>()
  const [randomMessage, setRandomMessage] = useState('')
  
  // 5秒後に当選者を取得するために遅延関数を定義
  const delayed = useDelay(5000);
   
  const getWinner = useCallback(async () => {
    try {
      socketRef.current?.send(JSON.stringify({ client: 'Random', message: event.target[0].value }))
      // 当選者を更新
      delayed().then(() => {
        setRandomMessage(users[0].number)
      });
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    getWinner();
     
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
      <Odometer value={randomMessage}></Odometer>
    </LotteryLayout>
  )
}

export default Lottery
