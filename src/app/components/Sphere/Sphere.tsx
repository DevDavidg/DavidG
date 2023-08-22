import React, { useMemo } from 'react';
import './style/index.scss';

interface ISphereProps {
  width?: string;
  height?: string;
  theme: 'l' | 'd';
}

const MemoizedSphere = React.memo(
  function Sphere(props: ISphereProps) {
    const generateSpokes = useMemo(() => {
      const spokes = [];
      for (let i = 0; i < 36; i++) {
        spokes.push(
          <div
            key={`spoke-${i}`}
            className={['spoke', `spoke-${i + 1}`].filter((p) => p).join(' ')}
          >
            <div className={props.theme === 'l' ? 'dot l' : 'dot d'} />
          </div>
        );
      }
      return spokes;
    }, [props.theme]);

    const spokeStyle = {
      '--width': props.width ?? '100px',
      '--height': props.height ?? '100px',
    } as React.CSSProperties;

    return (
      <div className="main-wrapper">
        <div className="sphere-wrapper" style={spokeStyle}>
          <div className="plane plane-1">
            <div>{generateSpokes}</div>
          </div>
          <div className="plane plane-9">
            <div>{generateSpokes}</div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.width === nextProps.width &&
      prevProps.height === nextProps.height &&
      prevProps.theme === nextProps.theme
    );
  }
);

MemoizedSphere.displayName = 'Sphere';

export default MemoizedSphere;
