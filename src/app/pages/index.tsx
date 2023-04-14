'use client';
import { useState } from 'react';
import Container from '../components/Container';
import Sphere from '../components/Sphere';
import Switch from '../components/switch';

function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleThemeChange = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
  };

  return (
    <>
      <Container width="100%" height="100vh" theme={isDarkMode ? 'd' : 'l'}>
        <Switch onChange={handleThemeChange} />
        <Sphere height={'200px'} theme={isDarkMode ? 'd' : 'l'}></Sphere>
      </Container>
    </>
  );
}

export default Index;
