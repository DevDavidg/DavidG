import './index.sass';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/darkLightModeContext';

interface SwitchProps {
  theme?: 'p' | 'd';
  style?: React.CSSProperties;
  onChange?: () => void;
}

const Switch: React.FC<SwitchProps> = React.memo(function Switch({
  theme = 'p',
  style,
}) {
  const { isDarkMode, toggleTheme, isRightToLeft, toggleDirection } =
    useTheme();
  const [checked, setChecked] = useState(isDarkMode || isRightToLeft);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setChecked(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const toggle = useCallback(() => {
    setChecked((prevChecked) => !prevChecked);
    toggleTheme();
    toggleDirection();
  }, [toggleTheme, toggleDirection]);

  const classNames = `switch ${theme} ${checked ? 'checked' : ''}`;

  return (
    <div className={classNames} onClick={toggle} style={style}>
      <div className="l"></div>
      {showSkeleton ? (
        <div className="skeleton-animation">{'\u00A0'}</div>
      ) : (
        <div className="switch__slider"></div>
      )}
      <div className="d"></div>
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
