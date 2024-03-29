import React, { useMemo, useRef, useEffect, useState } from 'react';
import './styles.scss';
import { ISphereProps } from '@/app/services/models';

function Sphere(props: Readonly<ISphereProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const sphereRef = useRef<HTMLDivElement | null>(null);

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
    '--width': props.width ?? '6.25',
    '--height': props.height ?? '6.25',
  } as React.CSSProperties;

  useEffect(() => {
    const currentSphereRef = sphereRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (currentSphereRef) {
      observer.observe(currentSphereRef);
    }

    return () => {
      if (currentSphereRef) {
        observer.unobserve(currentSphereRef);
      }
    };
  }, []);

  return (
    <div
      ref={sphereRef}
      className={`main-wrapper ${isVisible ? 'visible' : ''}`}
      style={props.style}
    >
      {isVisible && (
        <div className="sphere-wrapper" style={spokeStyle}>
          <div className="plane plane-1">
            <div>{generateSpokes}</div>
          </div>
          <div className="plane plane-9">
            <div>{generateSpokes}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sphere;
