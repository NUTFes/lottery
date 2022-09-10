import Bounty from '@/components/Bounty'
import o from './OdometerMini.module.css'
interface OdometerProps {
  value?: string
  className?: string
}

const OdometerMini = (props: OdometerProps) => {
  return (
    <div className={`${o.flex_container}`}>
      <div className={`${o.flex_container_gold}`}>
        <div className={`${o.flex_container_white}`}>
          <div className={`${o.lottery_font}`}>
            <Bounty
              value={props.value}
              initialValue={'77777777'}
              lineHeight={1.35}
              animationDelay={10}
              letterAnimationDelay={800}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OdometerMini
