import './index.sass';
import React, { useState, useCallback } from 'react';

interface SwitchProps {
  theme?: 'p' | 'd';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = React.memo(function Switch({
  theme = 'p',
  checked: initialChecked = false,
  onChange,
}) {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = useCallback(() => {
    setChecked((prevChecked) => !prevChecked);
    onChange?.(!checked);
  }, [checked, onChange]);

  const classNames = `switch ${theme} ${checked ? 'checked' : ''}`;

  return (
    <div className={classNames} onClick={toggle}>
      <div className="l">L</div>
      <div className="switch__slider"></div>
      <div className="d">d</div>
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
