'use client';
import Container from '../components/Container';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';
import React, { lazy, useEffect, useState } from 'react';
import Navbar from '../modules/navbar';
import Button from '../components/Button';
import Blob from '../components/Blob';
import './index.sass';

const LazySphere = lazy(() => import('../components/Sphere/index'));

function Index() {
  const { isDarkMode, toggleTheme, isRightToLeft, toggleDirection } =
    useTheme();

  const [animateTransition, setAnimateTransition] = useState(false);

  useEffect(() => {
    setAnimateTransition(true);
    const timeoutId = setTimeout(() => {
      setAnimateTransition(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isRightToLeft]);

  const section = (
    <Container
      height="100vh"
      id="home"
      align="center"
      justify="center"
      display="flex"
      className={animateTransition ? 'transition-animation' : ''}
      direction={isRightToLeft ? 'row-reverse' : 'row'}
    >
      <Container
        width="50%"
        display="flex"
        justify="center"
        align="center"
        height="100%"
      >
        <Blob
          theme={isDarkMode ? 'd' : 'l'}
          width="600px"
          height="500px"
          top="50%"
          left="50%"
        />
        <LazySphere
          theme={isDarkMode ? 'l' : 'd'}
          width="150px"
          height="150px"
        />
      </Container>
      <Container
        display="flex"
        direction="column"
        justify="center"
        align={isRightToLeft ? 'start' : 'end'}
        gap="75px"
        width="50%"
      >
        <Text
          theme={isDarkMode ? 'text-p' : 'text-d'}
          width="450px"
          height="60px"
        />
        <Text
          theme={isDarkMode ? 'text-p' : 'text-d'}
          width="600px"
          height="120px"
        />
        <Container display="flex" gap="50px">
          <Button theme={isDarkMode ? 'l' : 'd'} width="250px" height="65px" />
          <Button theme={isDarkMode ? 'l' : 'd'} width="250px" height="65px" />
        </Container>
      </Container>
    </Container>
  );

  return (
    <React.Fragment>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isRightToLeft={isRightToLeft}
        toggleDirection={toggleDirection}
      />
      <Container
        theme={isDarkMode ? 'd' : 'l'}
        display="flex"
        justify="center"
        align="center"
      >
        <Container
          width={`calc(100vw - ${isRightToLeft ? '150px' : '300px'})`}
          theme={isDarkMode ? 'd' : 'l'}
        >
          {section}
          <Container id="about" height="100vh">
            {}
          </Container>
          <Container id="projects" height="100vh">
            {}
          </Container>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Index;
