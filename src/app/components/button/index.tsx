import { CSSProperties } from 'react';
import './index.sass';

interface ButtonProps {
  text: string;
  theme: 'p' | 'd';
  outline?: boolean;
  width?: string;
  padding?: string;
  height?: string;
}

export default function Button(props: ButtonProps) {
  const style = {
    '--width': props.width ?? 'auto',
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
      {props.text}
    </button>
  );
}
