'use client';
import './index.sass';
import React from 'react';

interface SwitchProps {
  theme?: 'p' | 'd';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const [checked, setChecked] = React.useState(props.checked ?? false);
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
      <div className="switch__slider"></div>
    </div>
  );
};

export default Switch;
