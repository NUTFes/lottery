import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { get } from '@/utils/api_methods'

interface Props {
  register: number
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/register'
  const json = await get(getUrl)
  return {
    props: {
      register: json,
    },
  }
}

const Counter: NextPage<Props> = (props) => {
  const [register, setRegister] = useState<number>(props.register)
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    socketRef.current = new WebSocket(process.env.WS_API_URI)

    socketRef.current.onmessage = function (event) {
      let json = JSON.parse(event.data)
      if (json.client == 'NFC') {
        setRegister(register + 1)
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
    <div className="flex h-screen justify-center">
      <div className=" m-auto font-mono text-9xl">{register}</div>
    </div>
  )
}

export default Counter
