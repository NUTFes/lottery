import React, { useEffect, useRef } from 'react';
import bounty from 'bounty';
 
interface BountyProps {
  value: string
  className?: string
  initialValue?: string
  lineHeight?: number
  letterSpacing?: number
  animationDelay?: number
  letterAnimationDelay?: number
}

const Bounty = (props: BountyProps) => {
  const node = useRef(null);
  
  useEffect(() => {
    const { value, ...options } = props;
    bounty({
      el: node.current,
      value: props.value,
      ...options,
    });
  }, [props.value])
  
  return React.createElement('div', {
    className: props.className,
    ref: node,
  });
}
export default Bounty