import React, { Ref, useEffect, useState } from 'react';
import './index.sass';
import { ButtonProps } from '@/app/services/models';

const useShowSkeleton = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSkeleton(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  return showSkeleton;
};

const getStyle = ({
  width,
  padding,
  fontSize,
  href,
  height,
  styles,
}: ButtonProps) => ({
  '--width': width ?? '8rem',
  '--padding': padding ?? 'auto',
  '--font-size': fontSize ?? '1rem',
  textDecoration: href ? 'none' : 'auto',
  '--height': height ?? 'auto',
  ...styles,
});

const getCommonClasses = (
  { theme, outline, disabled }: ButtonProps,
  showSkeleton: boolean
) =>
  [
    'btn',
    theme,
    outline && 'outlined',
    !showSkeleton && disabled && 'disabledbtn',
  ]
    .filter(Boolean)
    .join(' ');

const renderContent = ({ theme }: ButtonProps) => (
  <div className={theme === 'd' ? 'btn__text--p' : 'btn__text--d'}></div>
);

interface ButtonContentProps extends ButtonProps {
  showSkeleton: boolean;
}

const ButtonContent: React.FC<ButtonContentProps> = ({
  href,
  buttonRef,
  disabled,
  showSkeleton,
  ...rest
}) => {
  const commonProps = {
    className: getCommonClasses(rest, showSkeleton),
    style: getStyle(rest),
  };

  const content = rest.text ?? renderContent(rest);

  if (href) {
    return (
      <a href={href} {...commonProps} aria-label={rest.ariaLabel ?? 'Link'}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as Ref<HTMLButtonElement>}
      disabled={disabled}
      {...commonProps}
    >
      {content}
    </button>
  );
};

const ButtonComponent: React.FC<ButtonProps> = React.memo((props) => {
  const showSkeleton = useShowSkeleton();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      props.onClick?.(e);
    }
  };

  return (
    <div
      style={{
        width: props.width ?? '8rem',
        position: 'relative',
        height: props.height ?? 'auto',
      }}
      onClick={(e) => props.onClick?.(e)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={props.divRef}
    >
      {showSkeleton ? (
        <span
          className="skeleton-animation"
          style={{ width: '100%', height: '100%' }}
        >
          {'\u00A0'}
        </span>
      ) : (
        <ButtonContent showSkeleton={showSkeleton} {...props} />
      )}
    </div>
  );
});

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
