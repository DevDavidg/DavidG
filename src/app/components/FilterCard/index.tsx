import React, { useState, useRef, useEffect, useCallback } from 'react';
import B from '../Button';
import { useTheme } from '@/app/context/darkLightModeContext';
import C from '../Container';
import { simpleHash } from '@/app/services/functions';
import { useDevice } from '@/app/context/deviceContext';
import { FilteredCardProps } from '@/app/services/models';

const FilterCard: React.FC<FilteredCardProps> = ({ onFilter, lang }) => {
  const device = useDevice();
  const [selLang, setSelLang] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const calculateTranslateX = useCallback(() => {
    return buttonRefs.current.slice(0, currentSlide).reduce((acc, button) => {
      return button
        ? acc +
            button.offsetWidth +
            parseFloat(window.getComputedStyle(button).marginRight)
        : acc;
    }, 0);
  }, [currentSlide]);

  useEffect(() => {
    const isLangLongEnough = lang.length >= 6;
    if (containerRef.current) {
      const buttonWidth = buttonRefs.current[0]?.offsetWidth ?? 0;
      containerRef.current.style.width = isLangLongEnough
        ? `${buttonWidth * 6}px`
        : 'auto';
      setTranslateX(isLangLongEnough ? calculateTranslateX() : 0);
    }
  }, [lang, currentSlide, calculateTranslateX, device]);

  const changeSlide = (direction: 'prev' | 'next') => {
    if (lang.length >= 6) {
      setCurrentSlide((prevSlide) =>
        direction === 'next'
          ? (prevSlide + 1) % lang.length
          : (prevSlide - 1 + lang.length) % lang.length
      );
    }
  };

  return (
    <C display="flex" direction="column" align="center">
      <div
        ref={containerRef}
        style={{ overflow: lang.length >= 6 ? 'hidden' : 'visible' }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            transform:
              lang.length >= 6 ? `translateX(-${translateX}px)` : 'none',
            transition: 'transform 0.5s',
          }}
        >
          {lang.map((l, index) => (
            <B
              buttonRef={(ref) => (buttonRefs.current[index] = ref)}
              key={l}
              onClick={() => {
                setSelLang(l);
                onFilter(l);
              }}
              text={l}
              width="fit-content"
              theme={!isDarkMode ? 'd' : 'l'}
              styles={{
                borderRadius: '0.3rem',
                whiteSpace: 'nowrap',
                ...(selLang === l && {
                  border: `1px solid ${isDarkMode ? 'black' : 'white'}`,
                  background: `${isDarkMode ? 'white' : 'black'}`,
                  color: `${isDarkMode ? 'black' : 'white'}`,
                }),
              }}
              padding="0.6rem"
            />
          ))}
        </div>
      </div>
      {device === 'mobile' || lang.length >= 6 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <button
            onClick={() => changeSlide('prev')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          >
            &lt;
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {new Array(Math.ceil(lang.length / 6)).fill(0).map((_, idx) => (
              <button
                key={simpleHash(idx.toString())}
                style={{
                  width: '0.7rem',
                  height: '0.7rem',
                  borderRadius: '50%',
                  background:
                    idx === Math.floor(currentSlide / 6) ? 'black' : 'grey',
                  cursor: 'pointer',
                  border: 'none',
                }}
                onClick={() => setCurrentSlide(idx * 6)}
              />
            ))}
          </div>
          <button
            onClick={() => changeSlide('next')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          >
            &gt;
          </button>
        </div>
      ) : (
        <></>
      )}
    </C>
  );
};

export default FilterCard;
