import Container from '@/app/components/Container';
import Switch from '@/app/components/switch';
import Text from '@/app/components/Text';
import React, { useEffect, useState } from 'react';
import './styles.sass';

function Navbar({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  style?: React.CSSProperties;
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
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container
      className={`navbar ${isDarkMode ? 'd' : 'l'} ${
        scrollingUp ? 'scrolling-up' : ''
      } ${scrolledPastTop ? 'scrolled-past-top' : ''} ${
        isNavbarFixed ? 'fixed' : ''
      }`}
    >
      <Container
        className={`navbar-content ${
          scrolledPastTop ? 'scrolled-past-top' : ''
        }`}
      >
        <Container
          justify="space-between"
          display="flex"
          width="100%"
          padding="1rem"
          theme={isDarkMode ? 'd' : 'l'}
        >
          <Text
            text={'<>DevDavidG'}
            theme={isDarkMode ? 'text-p' : 'text-d'}
            href="https://www.github.com/DevDavidG"
            width="120px"
          />
          <Switch onChange={handleThemeChange} />
        </Container>
      </Container>
    </Container>
  );
}

export default Navbar;
