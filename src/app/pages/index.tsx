'use client';
import Container from '../components/Container';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';
import { FadeInContextProvider, AnimationType } from '../context/fadeContext';
import React, { Suspense, lazy } from 'react';
import Navbar from '../modules/navbar';
import Button from '../components/Button';

const LazySphere = lazy(() => import('../components/Sphere'));
function Index() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Container
        theme={isDarkMode ? 'd' : 'l'}
        display="flex"
        justify="center"
        align="center"
      >
        <Container width={'calc(100vw - 40%)'} theme={isDarkMode ? 'd' : 'l'}>
          <Container
            justify="center"
            display="flex"
            width="100%"
            height="100vh"
            direction="column"
            id="home"
          >
            <Container>
              <FadeInContextProvider
                animation={AnimationType.FadeUp}
                duration={1}
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
              </FadeInContextProvider>
              <Button
                theme={isDarkMode ? 'd' : 'l'}
                text={'About Me'}
                padding={'10px 5px'}
                width={'80px'}
                href={'#about'}
              ></Button>
            </Container>
            <FadeInContextProvider
              animation={AnimationType.FadeUp}
              duration={1}
            >
              <Suspense fallback={<div></div>}>
                <LazySphere height={'200px'} theme={isDarkMode ? 'd' : 'l'} />
              </Suspense>
            </FadeInContextProvider>
          </Container>
          <Container id="about" height="100vh">
            {}
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Index;
