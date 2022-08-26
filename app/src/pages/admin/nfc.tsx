import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const Nfc: NextPage = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)
  const [sentMessage, setSentMessage] = useState('')
  const [nfcMessage, setNfcMessage] = useState('')
  const [nfcNumber, setNfcNumber] = useState('')
  const [nfcStatus, setNfcStatus] = useState('')

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws')
    socketRef.current.onopen = function () {
      //WebSocket接続が確立した時の処理
      setIsConnected(true)
      console.log('Connected')
    }

    socketRef.current.onclose = function () {
      //WebSocket接続が切断された時の処理
      console.log('closed')
      setIsConnected(false)
    }

    socketRef.current.onmessage = function (event) {
      //WebSocketサーバからメッセージが送られてきた時の処理
      let json = JSON.parse(event.data)
      console.log('message')
      setSentMessage(event.data)
      if (json.place_id == 1 && json.client == 'NFC') {
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
        抽選会受付
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
