import React from 'react';
import ml from './MobileLayout.module.css';
interface MobileLayoutProps {
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  gap?: string;
  children?: React.ReactNode;
}
const MobileLayout = (props: MobileLayoutProps) => {
  return (
    <div className={`${ml.container}`}>
      <img src="/bg_corner.png" className={`${ml.corner1}`} />
      <img src="/bg_corner.png" className={`${ml.corner2}`} />
      <img src="/bg_corner.png" className={`${ml.corner3}`} />
      <img src="/bg_corner.png" className={`${ml.corner4}`} />
      {props.children}
    </div>
  );
};
export default MobileLayout;