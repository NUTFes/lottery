import React from 'react'
import ml from './MobileLayout.module.css'
interface MobileLayoutProps {
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
}
const MobileLayout = (props: MobileLayoutProps) => {
  return (
    <div className={`${ml.container}`}>
      <div className={`${ml.odometerContainer}`}>
        <img src="/bg_corner.png" className={`${ml.corner1}`} />
        <img src="/bg_corner.png" className={`${ml.corner2}`} />
        <img src="/bg_corner.png" className={`${ml.corner3}`} />
        <img src="/bg_corner.png" className={`${ml.corner4}`} />
        <img src="/side.png" className={`${ml.center3}`} />
        <img src="/Lotelly.png" className={`${ml.center2}`} />
        <br/> {/* 調整用改行*/}
        <br/> {/* 調整用改行*/}
        <br/> {/* 調整用改行*/}
        <br/> {/* 調整用改行*/}
        <img src="/side.png" className={`${ml.center3}`} />
        <img src="/Results.png" className={`${ml.center1}`} />  
        <table className={`${ml.design}`}>
        <thead>
          <tr>
            <th className={`${ml.word1}`}>当選番号<hr className={`${ml.line}`} /></th>
            <th className={`${ml.word2}`}>学籍番号<hr className={`${ml.line}`} /></th>
          </tr>
        </thead>
        </table>
        <img src="/side.png" className={`${ml.center4}`} />  
      </div>
      {props.children}
    </div>
  )
  
}
export default MobileLayout
