'use client';
import Container from '../components/Container';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';
import { FadeInContextProvider, AnimationType } from '../context/fadeContext';
import React, { Suspense, lazy } from 'react';
import Navbar from '../modules/navbar';

const LazySphere = lazy(() => import('../components/Sphere'));
function Index() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Container
        theme={isDarkMode ? 'd' : 'l'}
        height="100vh"
        display="flex"
        justify="center"
        align="center"
      >
        <Container width={'calc(100vw - 40%)'} theme={isDarkMode ? 'd' : 'l'}>
          <Container
            justify="center"
            display="flex"
            width="100%"
            height="100%"
            direction="column"
          >
            <Text
              typingText={[
                'Hola, soy David',
                'Soy un desarrollador web',
                'Me especializo en React',
                'y en Diseño UX/UI',
              ]}
              width="220px"
              theme={isDarkMode ? 'text-p' : 'text-d'}
            />
            <FadeInContextProvider
              animation={AnimationType.FadeUp}
              duration={1}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LazySphere height={'200px'} theme={isDarkMode ? 'd' : 'l'} />
              </Suspense>
            </FadeInContextProvider>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Index;
