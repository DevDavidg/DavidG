import React from 'react';
import './style/index.scss';

interface ISphereProps {
  width?: string;
  height?: string;
  theme: 'l' | 'd';
}

const Sphere: React.FC<ISphereProps> = (props) => {
  const generateSpokes = (): JSX.Element[] => {
    const spokes = [];
    for (let i = 0; i < 36; i++) {
      spokes.push(
        <div className={['spoke', `spoke-${i + 1}`].filter((p) => p).join(' ')}>
          <div className="dot">
            <div className="inner-dot"></div>
          </div>
        </div>
      );
    }
    return spokes;
  };
  const spokeStyle = {
    '--width': props.width ?? '100px',
    '--height': props.height ?? '100px',
  } as React.CSSProperties;
  return (
    <div className="main-wrapper">
      <div className="sphere-wrapper" style={spokeStyle}>
        <div className="plane plane-1">
          <div>{generateSpokes()}</div>
        </div>
        <div className="plane plane-9">
          <div>{generateSpokes()}</div>
        </div>
      </div>
    </div>
  );
};

export default Sphere;
