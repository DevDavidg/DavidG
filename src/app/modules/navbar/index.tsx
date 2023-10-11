import Container from '@/app/components/Container';
import Switch from '@/app/components/switch';
import Text from '@/app/components/Text';
import React, { useEffect, useState } from 'react';
import './styles.sass';

function Navbar({
  isDarkMode,
  toggleTheme,
  isRightToLeft,
  toggleDirection,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  style?: React.CSSProperties;
  isRightToLeft: boolean;
  toggleDirection: () => void;
}) {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrolledPastTop, setScrolledPastTop] = useState(false);
  const [animateTransition, setAnimateTransition] = useState(false);

  useEffect(() => {
    setAnimateTransition(true);
    const timeoutId = setTimeout(() => {
      setAnimateTransition(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isRightToLeft]);

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

  const commonSection = (
    <Container
      justify="space-between"
      display="flex"
      width="100%"
      padding="1rem"
      className={animateTransition ? 'transition-animation' : ''}
    >
      {isRightToLeft ? (
        <>
          <Container display="flex" gap="25px">
            <Text
              href="#"
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'Home'}
            />
            <Text
              href="#About"
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'About'}
            />
            <Text
              href="#Work"
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'Work'}
            />
          </Container>
          <Switch onChange={handleThemeChange} />
        </>
      ) : (
        <>
          <Switch onChange={handleThemeChange} />
          <Container display="flex" gap="25px">
            <Text
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'Home'}
              href="#"
            />
            <Text
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'About'}
              href="#About"
            />
            <Text
              theme={isDarkMode ? 'text-d' : 'text-p'}
              width="120px"
              text={'Contact'}
              href="#Contact"
            />
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
