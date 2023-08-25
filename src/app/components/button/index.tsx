import { CSSProperties } from 'react';
import './index.sass';

interface ButtonProps {
  text?: string | React.JSX.Element;
  theme: 'p' | 'd';
  outline?: boolean;
  width?: string;
  padding?: string;
  height?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const style = {
    '--width': props.width ?? '80px',
    '--padding': props.padding ?? 'auto',
    '--height': props.height ?? '20px',
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
            className={props.theme === 'p' ? 'btn__text--p' : 'btn__text--d'}
          ></div>
        ),
      ]}
    </button>
  );
};

export default Button;
