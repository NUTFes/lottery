import MobileLayout from '@/components/MobileLayout'
import type { NextPage } from 'next'
import { get } from '@/utils/api_methods'
import Odometer from '@/components/OdometerMini'
import { useEffect, useRef, useState } from 'react'

export interface Winner {
  id: number
  place_id: string
  number: string
  updated_at: string
  created_at: string
  detail: string
}

interface Props {
  winners: Winner[]
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/winners'
  const json = await get(getUrl)
  return {
    props: {
      winners: json,
    },
  }
}

const Home: NextPage<Props> = (props) => {
  const socketRef = useRef<WebSocket>()
  const [randomMessage, setRandomMessage] = useState('77777777')
  // 当選者が追加された時に、時間を空けて当選者を取得するためのフラグ
  const [isAddWinner, setIsAddWinner] = useState(false)
  // ページ読み込み時にwinnersを表示
  const [winners, setWinners] = useState<Winner[]>(props.winners)

  useEffect(() => {
    socketRef.current = new WebSocket(process.env.WS_API_URI)

    socketRef.current.onmessage = function (event) {
      let json = JSON.parse(event.data)
      if (json.client == 'Random') {
        setRandomMessage(json.message)
        setIsAddWinner(true)
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
    <MobileLayout isAddWinner={isAddWinner} setIsAddWinner={setIsAddWinner} winners={winners} setWinners={setWinners}>
      <Odometer value={randomMessage} />
    </MobileLayout>
  )
}

export default Home
