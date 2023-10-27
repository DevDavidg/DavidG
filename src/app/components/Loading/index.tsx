import React, { useState, useEffect } from 'react';
import themes from '../../stylesheets/theme.module.sass';

interface SpinnerProps {
  loading: boolean;
  background?: boolean;
  height?: string | number;
  bgWidth?: string | number;
  bgHeight?: string | number;
  theme?: 'l' | 'd';
  borderWidth?: string | number;
}

const Spinner: React.FC<SpinnerProps> = ({
  loading,
  background,
  height = '50px',
  bgWidth = '100px',
  bgHeight = '100px',
  theme = 'l',
  borderWidth,
}) => {
  const [animationDuration, setAnimationDuration] = useState('1s');

  useEffect(() => {
    const size = typeof height === 'number' ? height : parseInt(height, 10);
    const duration = size < 50 ? 0.5 : 1.5;
    setAnimationDuration(`${duration}s`);
  }, [height]);

  const borderThickness =
    typeof height === 'number' ? height / 10 : parseInt(height, 10) / 10;

  const lightTheme = {
    color: themes.d,
    secondaryColor: themes.w,
  };

  const darkTheme = {
    color: themes.w,
    secondaryColor: themes.d,
  };

  const { color, secondaryColor } = theme === 'l' ? lightTheme : darkTheme;

  const containerStyle = background
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: bgWidth,
        height: bgHeight,
        backgroundColor: 'transparent',
      }
    : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

  const spinnerStyle = {
    border: `${borderWidth ?? borderThickness}px solid ${secondaryColor}`,
    borderTop: `${borderWidth ?? borderThickness}px solid ${color}`,
    borderRadius: '50%',
    width: height,
    height: height,
    animation: `spin ${animationDuration} ease-in-out infinite`,
  };

  const keyframesStyle = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

  return (
    <>
      <style>{keyframesStyle}</style>
      {loading && (
        <div style={containerStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
