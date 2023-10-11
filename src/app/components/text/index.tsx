import React, { useState, useEffect, useCallback } from 'react';
import './index.sass';

interface TextProps {
  text?: string | React.JSX.Element;
  theme?: 'text-p' | 'text-d' | 'text-default';
  size?: 's' | 'sm' | 'm' | 'l' | 'xl';
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

  useEffect(() => {
    if (typingText.length > 0) {
      const cursorInterval = setInterval(() => {
        setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
      }, 500);

      const timeout = setTimeout(
        () => {
          const currentWord = typingText[currentTextIndex % typingText.length];

          if (isDeleting) {
            if (typeof displayedText === 'string' && displayedText.length > 0) {
              setDisplayedText(displayedText.slice(0, -1));
            } else {
              setIsDeleting(false);
              setCurrentTextIndex(currentTextIndex + 1);
            }
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
        clearInterval(cursorInterval);
        clearTimeout(timeout);
      };
    }
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    showSkeleton,
    typingInterval,
    deleteInterval,
    typingText,
    handleTypingAnimation,
  ]);

  const textClassNames = [
    'text',
    props.theme ?? 'text-default',
    props.size ?? 'm',
    props.align ?? 'left',
  ].join(' ');

  const renderContent = () => {
    const textContent = props.href ? (
      <a
        key="text-link"
        href={props.href}
        style={{
          margin,
          padding,
          width,
          height,
          fontWeight: weight,
          ...props.style,
        }}
      >
        {props.text}
      </a>
    ) : (
      <span
        key="text-content"
        style={{
          margin,
          padding,
          width,
          height,
          fontWeight: weight,
          ...props.style,
        }}
      >
        {props.text}
      </span>
    );

    return (
      <span
        style={{
          margin,
          padding,
          width,
          height,
          fontWeight: weight,
          ...props.style,
        }}
      >
        {textContent}
        {typingText.length > 0 &&
          Array.from(String(displayedText)).map((char, index) => {
            const uniqueKey = `char-${index}-${JSON.stringify(char)}`;
            return <span key={uniqueKey}>{char}</span>;
          })}
        {typingText.length > 0 && isCursorVisible && (
          <span className="cursor">|</span>
        )}
      </span>
    );
  };

  useEffect(() => {
    if (props.text) {
      setShowSkeleton(false);
    }
  }, [props.text]);

  return (
    <>
      {props.text || typingText.length > 0 ? (
        <p
          style={{
            margin,
            padding,
            width,
            height,
            fontWeight: weight,
            ...props.style,
          }}
          className={textClassNames}
        >
          {showSkeleton ? (
            <span className="skeleton-animation">{'\u00A0'}</span>
          ) : (
            renderContent()
          )}
        </p>
      ) : (
        <div
          style={{
            width,
            height,
            backgroundColor: props.theme === 'text-d' ? 'white' : 'black',
            borderRadius: '10px',
          }}
        />
      )}
    </>
  );
};

export default Text;
