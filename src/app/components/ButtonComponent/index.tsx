import React, { useEffect, useState } from 'react';
import './index.sass';
import { ButtonProps } from '@/app/services/models';
import Container from '../Container';

const ButtonComponent: React.FC<ButtonProps> = React.memo((props) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSkeleton(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  const buildStyle = () => ({
    '--width': props.width ?? '8rem',
    '--padding': props.padding ?? 'auto',
    '--font-size': props.fontSize ?? '1rem',
    textDecoration: props.href ? 'none' : 'auto',
    '--height': props.height ?? 'auto',
    ...props.style,
  });

  const style = buildStyle();

  const buildCommonClasses = () =>
    [
      'btn',
      props.theme,
      props.outline && 'outlined',
      !showSkeleton && props.disabled && 'disabledbtn',
    ]
      .filter(Boolean)
      .join(' ');

  const commonClasses = buildCommonClasses();

  const renderContent = () => {
    if (showSkeleton) {
      return (
        <span
          className="skeleton-animation"
          style={{ width: '100%', height: '100%' }}
        >
          {'\u00A0'}
        </span>
      );
    }

    return props.href ? (
      <a href={props.href} className={commonClasses} style={style}>
        {props.text ?? (
          <div
            className={props.theme === 'd' ? 'btn__text--p' : 'btn__text--d'}
          ></div>
        )}
      </a>
    ) : (
      <button
        className={commonClasses}
        style={style}
        ref={props.buttonRef}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text ?? (
          <div
            className={props.theme === 'd' ? 'btn__text--p' : 'btn__text--d'}
          ></div>
        )}
      </button>
    );
  };

  return renderContent();
});

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
