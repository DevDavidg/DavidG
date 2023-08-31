import { CSSProperties } from 'react';
import './index.sass';

interface ButtonProps {
  text?: string | React.JSX.Element;
  theme: 'd' | 'l';
  outline?: boolean;
  width?: string;
  padding?: string;
  height?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const style = {
    '--width': props.width ?? '80px',
    '--padding': props.padding ?? 'auto',
    '--height': props.height ?? 'auto',
  } as CSSProperties;
  return (
    <button
      style={style}
      className={['btn', props.theme, props.outline ? 'outlined' : null]
        .filter((p) => p)
        .join(' ')}
    >
      {[
        props.text ?? (
          <div
            className={props.theme === 'd' ? 'btn__text--p' : 'btn__text--d'}
          ></div>
        ),
      ]}
    </button>
  );
};

export default Button;
