import React, { useState, useEffect, useCallback } from 'react';
import './index.sass';

interface TextProps {
  text?: string | React.JSX.Element;
  theme?: 'text-p' | 'text-d' | 'text-default';
  size?: 's' | 'm' | 'l';
  weight?: 'light' | 'regular' | 'bold';
  align?: 'left' | 'center' | 'right';
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  href?: string;
  typingText?: string[];
  typingInterval?: number;
  deleteInterval?: number;
}

const Text: React.FC<TextProps> = (props) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState<
    string | React.JSX.Element
  >('');
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const handleTypingAnimation = useCallback(
    (currentWord: string) => {
      if (
        typeof currentWord === 'string' &&
        typeof displayedText === 'string'
      ) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      }
    },
    [displayedText]
  );

  useEffect(() => {
    if (!props.typingText) {
      setShowSkeleton(false);
      setDisplayedText(props.text ?? '');
      return;
    }

    const typingInterval = props.typingInterval ?? 100;
    const deleteInterval = props.deleteInterval ?? 90;
    const typingText = props.typingText || [];
    const currentWord = typingText[currentTextIndex % typingText.length];

    const handleDeletion = () => {
      if (typeof displayedText === 'string' && displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentTextIndex(currentTextIndex + 1);
      }
    };

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          handleDeletion();
        } else {
          handleTypingAnimation(currentWord);
        }

        if (showSkeleton) {
          setShowSkeleton(false);
        }
      },
      isDeleting ? deleteInterval : typingInterval
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    showSkeleton,
    props,
    handleTypingAnimation,
  ]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  const style = {
    '--margin': props.margin ?? 'auto',
    '--padding': props.padding ?? 'auto',
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
  } as React.CSSProperties;

  const renderText = props.href ? (
    <a key="text-link" href={props.href}>
      {displayedText}
    </a>
  ) : (
    <span key="text-content">
      {React.Children.toArray(displayedText).map((char, index) => {
        const uniqueKey = `char-${index}-${JSON.stringify(char)}`;
        return <span key={uniqueKey}>{char}</span>;
      })}
      {isCursorVisible && <span className="cursor">|</span>}
    </span>
  );

  return (
    <p
      style={{ ...style, ...props.style }}
      className={[
        'text',
        props.theme ?? 'text-default',
        props.size ?? 'm',
        props.weight ?? 'regular',
        props.align ?? 'left',
      ].join(' ')}
    >
      {showSkeleton ? (
        <span className="skeleton-animation">{'\u00A0'}</span>
      ) : (
        renderText
      )}
    </p>
  );
};

export default Text;
