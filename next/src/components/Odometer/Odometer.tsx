import Bounty from 'react-bounty'
import o from './Odometer.module.css'
interface OdometerProps {
  value?: string
}

const Odometer = (props: OdometerProps) => {
  return (
    <div className={`${o.flex_container}`}>
      <div className={`${o.flex_container_gold}`}>
        <div className={`${o.flex_container_white}`}>
          <Bounty
            value={props.value}
            initialValue={'77777777'}
            lineHeight={1.35}
            animationDelay={100}
            duration={2000}
            letterAnimationDelay={800}
          />
        </div>
      </div>
    </div>
  )
}

export default Odometer
