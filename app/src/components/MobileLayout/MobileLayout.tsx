import React, { useEffect, useCallback } from 'react'
import ml from './MobileLayout.module.css'
import { get } from '@/utils/api_methods'
import { Winner } from '@/pages/index'

interface MobileLayoutProps {
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
  isAddWinner: boolean
  setIsAddWinner: any
  winners: Winner[]
  setWinners: any
}

// Delayを設定する
function useDelay(time: number) {
  return React.useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }, [time])
}

const MobileLayout = (props: MobileLayoutProps) => {
  const getUrl = process.env.CSR_API_URI + '/winners'
  // 10秒後に当選者を取得するために遅延関数を定義
  const delayed = useDelay(10000)

  //  当選10秒後に当選者を更新
  const getWinners = useCallback(async () => {
    try {
      const response = await get(getUrl)
      // 当選者を更新
      delayed().then(() => props.setWinners(response))
      // addWinnerフラグをfalseにする
      delayed().then(() => props.setIsAddWinner(false))
    } catch (err) {
      console.error(err)
    }
  }, [props.isAddWinner])

  // props.isAddWinnerがtrueになった時にgetWinnersを実行
  useEffect(() => {
    getWinners()
  }, [props.isAddWinner])

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
            {props.winners?.map((winner: Winner, index: number) => (
              <tr key={winner.id}>
                <td className={`${ml.winner_id} font-serif`}>{index + 1}</td>
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
