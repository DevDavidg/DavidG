import React, { useState, useEffect } from 'react';
import './styles.scss';

interface RotatingContainerProps {
  children: React.ReactNode;
  height: string;
}

const RotatingContainer: React.FC<RotatingContainerProps> = ({
  children,
  height,
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxRotation = 360;
      const newRotation =
        (scrollPosition / (document.body.scrollHeight - window.innerHeight)) *
        maxRotation;
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="rotating-container"
      style={{
        height,
        transform: `rotate(${rotation}deg)`, // Aplicar la rotación dinámica
      }}
    >
      {children}
    </div>
  );
};

export default RotatingContainer;
