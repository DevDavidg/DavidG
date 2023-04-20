import './index.sass';
import React, { useState } from 'react';
import 'boxicons';

interface SwitchProps {
  theme?: 'p' | 'd';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const [checked, setChecked] = useState(props.checked ?? false);
  const toggle = () => {
    setChecked(!checked);
    props.onChange?.(!checked);
  };
  return (
    <div
      className={['switch', props.theme ?? 'p', checked ? 'checked' : null]
        .filter((p) => p)
        .join(' ')}
      onClick={toggle}
    >
      <div className="l">L</div>
      <div className="switch__slider"></div>
      <div className="d">d</div>
    </div>
  );
};

export default Switch;
