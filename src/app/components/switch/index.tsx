import './index.sass';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/darkLightModeContext';

interface SwitchProps {
  theme?: 'p' | 'd';
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = React.memo(function Switch({
  theme = 'p',
  onChange,
}) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(isDarkMode);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setChecked(isDarkMode); // Actualiza el estado cuando cambie el tema
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
    toggleTheme(); // Cambia el tema cuando se activa/desactiva el interruptor
  }, [toggleTheme]);

  const classNames = `switch ${theme} ${checked ? 'checked' : ''}`;

  return (
    <div className={classNames} onClick={toggle}>
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
