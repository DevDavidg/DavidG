import React, { useState, useEffect, useCallback } from 'react';
import './index.sass';

interface TextProps {
  text?: string | React.JSX.Element;
  theme?: 'text-p' | 'text-d' | 'text-default';
  size?: 's' | 'sm' | 'm' | 'l' | 'xl' | `${number}${'px' | 'rem'}`;
  weight?: 'semibold' | 'light' | 'regular' | 'bold' | 'bolder';
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
  const {
    typingInterval = 100,
    deleteInterval = 90,
    typingText = [],
    margin = '',
    padding = 'auto',
    width = 'auto',
    height = 'auto',
    weight = 'regular',
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState<
    string | React.JSX.Element
  >('');
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const handleTypingAnimation = useCallback(
    (currentWord: string) => {
      if (
        typeof currentWord === 'string' &&
        typeof displayedText === 'string'
      ) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          setIsCursorVisible(false);
        } else {
          setIsDeleting(true);
          setIsCursorVisible(true);
        }
      }
    },
    [displayedText]
  );

  const toggleCursorVisibility = useCallback(() => {
    setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
  }, []);

  const handleDeleting = useCallback(() => {
    if (typeof displayedText === 'string' && displayedText.length > 0) {
      setDisplayedText(displayedText.slice(0, -1));
    } else {
      setIsDeleting(false);
      setCurrentTextIndex(currentTextIndex + 1);
    }
  }, [displayedText, currentTextIndex]);

  const handleTimeout = useCallback(() => {
    const currentWord = typingText[currentTextIndex % typingText.length];

    if (isDeleting) {
      handleDeleting();
    } else {
      handleTypingAnimation(currentWord);
    }

    if (showSkeleton) {
      setShowSkeleton(false);
    }
  }, [
    isDeleting,
    currentTextIndex,
    showSkeleton,
    typingText,
    handleDeleting,
    handleTypingAnimation,
  ]);

  useEffect(() => {
    if (typingText.length > 0) {
      const cursorInterval = setInterval(toggleCursorVisibility, 500);
      const timeout = setTimeout(
        handleTimeout,
        isDeleting ? deleteInterval : typingInterval
      );

      return () => {
        clearInterval(cursorInterval);
        clearTimeout(timeout);
      };
    }
  }, [
    isDeleting,
    typingInterval,
    deleteInterval,
    typingText,
    handleTimeout,
    toggleCursorVisibility,
  ]);

  const textClassNames = [
    'text',
    props.theme ?? 'text-default',
    props.size ?? 'm',
  ].join(' ');

  const textStyles = {
    margin,
    padding,
    width,
    height,
    fontWeight: weight,
    ...props.style,
    fontSize: props.size,
  };

  const renderContent = () => {
    const textContent = props.href ? (
      <a
        key="text-link"
        href={props.href}
        style={textStyles}
        className={textClassNames}
      >
        {props.text}
      </a>
    ) : (
      <span key="text-content" style={textStyles} className={textClassNames}>
        {props.text}
      </span>
    );

    const typingContent = (
      <span key="typing-content" className={textClassNames} style={textStyles}>
        {Array.from(String(displayedText)).map((char, index) => {
          const uniqueKey = `char-${index}-${JSON.stringify(char)}`;
          return <span key={uniqueKey}>{char}</span>;
        })}
        {isCursorVisible && <span className="cursor">|</span>}
      </span>
    );

    return <>{props.text ? textContent : typingContent}</>;
  };

  const renderOutput = () => {
    if (props.text || typingText.length > 0) {
      return renderContent();
    } else {
      return (
        <div
          style={{
            width,
            height,
            backgroundColor: props.theme === 'text-d' ? 'white' : 'black',
            borderRadius: '10px',
          }}
        />
      );
    }
  };

  useEffect(() => {
    if (props.text) {
      setShowSkeleton(false);
    }
  }, [props.text]);

  return (
    <>
      {showSkeleton ? (
        <span className="skeleton-animation" style={textStyles}>
          {'\u00A0'}
        </span>
      ) : (
        renderOutput()
      )}
    </>
  );
};

export default Text;
