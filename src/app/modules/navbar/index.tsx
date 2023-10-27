import Container from '@/app/components/Container';
import Switch from '@/app/components/switch';
import Text from '@/app/components/Text';
import React, { useEffect, useState } from 'react';
import './styles.sass';
import { addSpace } from '@/app/services/functions';

function Navbar({
  isDarkMode,
  toggleTheme,
  isRightToLeft,
  toggleDirection,
  animateTransition,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  style?: React.CSSProperties;
  isRightToLeft: boolean;
  toggleDirection: () => void;
  animateTransition: boolean;
}) {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrolledPastTop, setScrolledPastTop] = useState(false);

  const someThresholdValue = 10;

  const handleScroll = () => {
    const scrolled = window.scrollY;
    setScrollingUp(
      scrolled > someThresholdValue && scrolled < window.innerHeight
    );
    setScrolledPastTop(scrolled > window.innerHeight);
    setIsNavbarFixed(scrolled > someThresholdValue);
  };

  const handleThemeChange = () => {
    toggleTheme();
    toggleDirection();
  };

  const commonTexts = (
    <>
      <Text
        href="#"
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="7.5rem"
        text={'Home'}
      />
      <Text
        href="#About"
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="7.5rem"
        text={'About'}
      />
      <Text
        href="#Work"
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="7.5rem"
        text={'Work'}
      />
    </>
  );

  const commonSection = (
    <Container
      justify="space-between"
      display="flex"
      width="100%"
      padding="1rem"
      className={addSpace(
        animateTransition
          ? 'transition-animation'
          : 'transition-animation-right'
      )}
    >
      {isRightToLeft ? (
        <>
          <Container display="flex" gap="1.56rem">
            {commonTexts}
          </Container>
          <Switch onChange={handleThemeChange} />
        </>
      ) : (
        <>
          <Switch onChange={handleThemeChange} />
          <Container display="flex" gap="1.56rem">
            {commonTexts}
          </Container>
        </>
      )}
    </Container>
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container
      className={`navbar ${scrollingUp ? 'scrolling-up' : ''} ${
        scrolledPastTop ? 'scrolled-past-top' : ''
      } ${isNavbarFixed ? 'fixed' : ''}`}
    >
      <Container
        className={`navbar-content ${
          scrolledPastTop ? 'scrolled-past-top' : ''
        }`}
      >
        {commonSection}
      </Container>
    </Container>
  );
}

export default Navbar;
