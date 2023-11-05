import React, { useEffect, useState, useCallback } from 'react';
import Container from '@/app/components/Container';
import Switch from '@/app/components/switch';
import { addSpace } from '@/app/services/functions';
import './styles.sass';
import TextComponent from '@/app/components/Text';

type NavbarProps = {
  readonly isDarkMode: boolean;
  readonly toggleTheme: () => void;
  readonly isRightToLeft: boolean;
  readonly toggleDirection: () => void;
  readonly animateTransition: boolean;
};

const TextLinks = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <>
    {['Home', 'About', 'Work'].map((text) => (
      <TextComponent
        key={text}
        href={`#${text}`}
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="7.5rem"
        text={text}
      />
    ))}
  </>
);

const CommonSection = ({
  isRightToLeft,
  handleThemeChange,
  isDarkMode,
  animateTransition,
}: {
  isRightToLeft: boolean;
  handleThemeChange: () => void;
  isDarkMode: boolean;
  animateTransition: boolean;
}) => (
  <Container
    justify="space-between"
    display="flex"
    width="100%"
    padding="1rem"
    className={addSpace(
      animateTransition ? 'transition-animation' : 'transition-animation-right'
    )}
  >
    {isRightToLeft ? (
      <>
        <Container display="flex" gap="1.56rem">
          <TextLinks isDarkMode={isDarkMode} />
        </Container>
        <Switch onChange={handleThemeChange} />
      </>
    ) : (
      <>
        <Switch onChange={handleThemeChange} />
        <Container display="flex" gap="1.56rem">
          <TextLinks isDarkMode={isDarkMode} />
        </Container>
      </>
    )}
  </Container>
);

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  isRightToLeft,
  toggleDirection,
  animateTransition,
}) => {
  const [state, setState] = useState({
    isNavbarFixed: false,
    scrollingUp: false,
    scrolledPastTop: false,
  });

  const { isNavbarFixed, scrollingUp, scrolledPastTop } = state;

  const someThresholdValue = 10;

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    setState((prevState) => ({
      ...prevState,
      scrollingUp:
        scrolled > someThresholdValue && scrolled < window.innerHeight,
      scrolledPastTop: scrolled > window.innerHeight,
      isNavbarFixed: scrolled > someThresholdValue,
    }));
  }, []);

  const handleThemeChange = useCallback(() => {
    toggleTheme();
    toggleDirection();
  }, [toggleTheme, toggleDirection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
        <CommonSection
          isRightToLeft={isRightToLeft}
          handleThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          animateTransition={animateTransition}
        />
      </Container>
    </Container>
  );
};

export default Navbar;
