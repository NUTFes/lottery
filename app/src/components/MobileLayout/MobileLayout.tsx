import React, { useEffect } from 'react'
import ml from './MobileLayout.module.css'
import { get } from '@/utils/api_methods'

interface Winner {
  id: number
  place_id: string
  number: string
  updated_at: string
  created_at: string
  detail: string
}

interface MobileLayoutProps {
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
}

const MobileLayout = (props: MobileLayoutProps) => {
  const [winners, setWinners] = React.useState<Winner[]>()
  useEffect(() => {
    const getUrl = process.env.CSR_API_URI + '/winners'
    const getWinners = async (url: string) => {
      setWinners(await get(url))
    }
    getWinners(getUrl)
  }, [])

  return (
    <div className={`${ml.container}`}>
      <div className={`${ml.odometerContainer}`}>
        <img src="/bg_corner.png" className={`${ml.corner1}`} />
        <img src="/bg_corner.png" className={`${ml.corner2}`} />
        <img src="/bg_corner.png" className={`${ml.corner3}`} />
        <img src="/bg_corner.png" className={`${ml.corner4}`} />
        <img src="/side.png" className={`${ml.center3}`} />
        <img src="/Lotelly.png" className={`${ml.center2}`} />
        <br /> {/* 調整用改行*/}
        <br /> {/* 調整用改行*/}
        {props.children}
        <br /> {/* 調整用改行*/}
        <br /> {/* 調整用改行*/}
        <img src="/side.png" className={`${ml.center3}`} />
        <img src="/Results.png" className={`${ml.center1}`} />
        <table className={`${ml.design}`}>
          <thead>
            <tr>
              <th className={`${ml.word1}`}>
                当選番号
                <hr className={`${ml.line}`} />
              </th>
              <th className={`${ml.word2}`}>
                学籍番号
                <hr className={`${ml.line}`} />
              </th>
            </tr>
          </thead>
          <tbody>
            {winners?.map((winner: Winner) => (
              <tr>
                <td className={`${ml.winner_id} font-serif`}>{winner.id}</td>
                <td className={`${ml.winner_number} font-serif`}>{winner.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <img src="/side.png" className={`${ml.center4}`} />
      </div>
    </div>
  )
}
export default MobileLayout
