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
  key?: string;
  styles?: React.CSSProperties;
  divRef?: React.Ref<HTMLDivElement>;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

type CustomStyle = {
  '--width'?: string;
  '--padding'?: string;
  '--height'?: string;
  '--font-size'?: string;
  textDecoration?: string;
};

const Button: React.FC<ButtonProps> = React.memo((props) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const style: CustomStyle = {
    '--width': props.width ?? '80px',
    '--padding': props.padding ?? 'auto',
    '--font-size': props.fontSize ?? '13px',
    textDecoration: props.href ? 'none' : '',
    '--height': props.height ?? 'auto',
  };

  const commonClasses = ['btn', props.theme, props.outline && 'outlined']
    .filter((p) => p)
    .join(' ');

  return (
    <div
      style={{
        width: props.width ?? '80px',
        ...style,
        position: 'relative',
        height: props.height ?? 'auto',
      }}
      onClick={props.onClick}
      key={props.key}
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
            style={style && props.styles}
            ref={props.buttonRef}
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
