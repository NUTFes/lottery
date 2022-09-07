import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const Nfc: NextPage = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)
  const [sentMessage, setSentMessage] = useState('')
  const [nfcMessage, setNfcMessage] = useState('')
  const [nfcNumber, setNfcNumber] = useState('')
  const [nfcStatus, setNfcStatus] = useState('')

  const router = useRouter()
  const query = router.query

  useEffect(() => {
    socketRef.current = new WebSocket(process.env.WS_API_URI)
    socketRef.current.onopen = function () {
      //WebSocket接続が確立した時の処理
      setIsConnected(true)
      console.log('Connected')
      console.log('id: ' + query.id)
    }

    socketRef.current.onclose = function () {
      //WebSocket接続が切断された時の処理
      console.log('closed')
      console.log('id: ' + query.id)
      setIsConnected(false)
    }

    socketRef.current.onmessage = function (event) {
      //WebSocketサーバからメッセージが送られてきた時の処理
      let json = JSON.parse(event.data)
      console.log('message')
      console.log('id: ' + query.id)
      setSentMessage(event.data)
      if (json.place_id == query.id && json.client == 'NFC') {
        setNfcMessage(json.message)
        setNfcNumber(json.number)
        setNfcStatus(json.status)
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
    <div className="h-screen font-sans">
      <div className="flex h-1/6 w-screen  items-center justify-center bg-gray-700 text-center text-5xl text-white">
        抽選会 受付{query.id}
      </div>

      <div className="text-gray h-1/3 w-screen items-center justify-center text-center text-2xl">
        <p className="my-8 text-2xl font-bold text-gray-500">学籍番号</p>
        <div className="text-gray my-2 flex w-screen items-center justify-center text-center text-8xl">{nfcNumber}</div>
      </div>
      {nfcStatus == 'success' ? (
        <div className="text-gray flex h-1/3  w-screen items-center justify-center text-center text-2xl">
          <div className="text-gray flex h-full w-10/12 items-center justify-center rounded-3xl bg-green-100 py-10 text-center text-5xl">
            {nfcMessage}
          </div>
        </div>
      ) : (
        <div className="text-gray flex h-1/3  w-screen items-center justify-center text-center text-2xl">
          <div className="text-gray flex h-full w-10/12 items-center justify-center rounded-3xl bg-red-100 py-10 text-center text-5xl">
            {nfcMessage}
          </div>
        </div>
      )}
    </div>
  )
}

export default Nfc
