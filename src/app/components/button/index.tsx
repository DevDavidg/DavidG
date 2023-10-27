import React, { useEffect, useState } from 'react';
import './index.sass';

interface ButtonProps {
  text?: string | React.JSX.Element;
  theme: 'd' | 'l';
  outline?: boolean;
  width?: string;
  padding?: string;
  height?: string;
  href?: string;
  fontSize?: string;
  onClick?: () => void;
  styles?: React.CSSProperties;
  divRef?: React.Ref<HTMLDivElement>;
  buttonRef?: React.Ref<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo((props) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const style = {
    '--width': props.width ?? '8rem',
    '--padding': props.padding ?? 'auto',
    '--font-size': props.fontSize ?? '1rem',
    textDecoration: props.href ? 'none' : 'auto',
    '--height': props.height ?? 'auto',
    ...props.styles,
  };

  const commonClasses = [
    'btn',
    props.theme,
    props.outline && 'outlined',
    !showSkeleton && props.disabled && 'disabledbtn',
  ]
    .filter((p) => p)
    .join(' ');

  return (
    <div
      style={{
        width: props.width ?? '8rem',
        ...style,
        position: 'relative',
        height: props.height ?? 'auto',
      }}
      onClick={props.onClick}
      ref={props.divRef}
    >
      {showSkeleton && (
        <span
          className="skeleton-animation"
          style={{ width: '100%', height: '100%' }}
        >
          {'\u00A0'}
        </span>
      )}
      {!showSkeleton &&
        (props.href ? (
          <a href={props.href} className={commonClasses} style={style}>
            {props.text ?? (
              <div
                className={
                  props.theme === 'd' ? 'btn__text--p' : 'btn__text--d'
                }
              ></div>
            )}
          </a>
        ) : (
          <button
            className={commonClasses}
            style={style}
            ref={props.buttonRef}
            disabled={props.disabled}
          >
            {props.text ?? (
              <div
                className={
                  props.theme === 'd' ? 'btn__text--p' : 'btn__text--d'
                }
              ></div>
            )}
          </button>
        ))}
    </div>
  );
});

Button.displayName = 'Button';

export default Button;
