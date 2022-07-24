import Bounty from 'react-bounty';
import o from './Odometer.module.css';
interface OdometerProps {
  value?: string;
}

const Odometer = (props: OdometerProps) => {
  return (
    <Bounty value={ props.value } initialValue={ '77777777' } lineHeight={ 1.35 } animationDelay={ 100 } duration={ 2000 } letterAnimationDelay={ 800 }/>
  )
}

export default Odometer
