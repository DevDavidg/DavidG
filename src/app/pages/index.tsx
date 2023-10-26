'use client';
import React, { useEffect, useState, lazy } from 'react';
import Navbar from '../modules/navbar';
import Container from '../components/Container';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';
import Button from '../components/Button';
import Blob from '../components/Blob';
import './index.sass';
import AboutSection from './aboutSection';
import ProjectsSection from './projectSection';

const calculateHomeSectionTop = () =>
  typeof window !== 'undefined'
    ? document.getElementById('home')?.getBoundingClientRect().top ?? 0
    : 0;

const calculateCurrentTheme = (isDarkMode: boolean, homeSectionTop: number) => {
  return typeof window !== 'undefined' &&
    homeSectionTop >= 0 &&
    homeSectionTop <= window.innerHeight
    ? isDarkMode
    : !isDarkMode;
};

const calculateSphereStyle = (scrollY: number) => ({
  transform: `translateY(${scrollY}px)`,
  transition: 'transform 0.5s ease',
});

const calculateTranslateXValue = (
  isDarkMode: boolean,
  isRightToLeft: boolean,
  scrollY: number
) => {
  let translateX;
  if (isRightToLeft) {
    translateX = isDarkMode ? scrollY / 3 : -scrollY / 3;
  } else {
    translateX = -scrollY / 3;
  }
  return `translateX(${translateX}px)`;
};

const calculateBlobStyle = (scrollY: number, translateXValue: string) => ({
  transform: `translateY(${scrollY / 2.7}px) ${translateXValue}`,
  transition: 'transform 0.5s ease',
  filter: `blur(${scrollY * 0.2}px)`,
});

const LazySphere = lazy(() => import('../components/Sphere'));

const renderSection = (
  currentTheme: 'l' | 'd',
  animateTransition: boolean,
  isRightToLeft: boolean,
  isDarkMode: boolean,
  blobStyle: React.CSSProperties,
  sphereStyle: React.CSSProperties
) => (
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
        style={blobStyle}
      />
      <LazySphere
        theme={currentTheme}
        width="150px"
        height="150px"
        style={sphereStyle}
      />
    </Container>
    <Container
      display="flex"
      direction="column"
      justify="center"
      align={isRightToLeft ? 'start' : 'end'}
      width="50%"
      gap="5px"
    >
      <Text
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="200px"
        height="23px"
        text={
          `Hello, i'm` + ' ' + (isRightToLeft ? 'Developer' : 'UX/UI Designer')
        }
        size="m"
        padding="0"
        style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
      />
      <Text
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="420px"
        height="90px"
        text={'David Guillen'}
        size="xl"
        style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
      />
      <Text
        theme={isDarkMode ? 'text-d' : 'text-p'}
        width="250px"
        height="25px"
        typingText={
          isRightToLeft
            ? [
                'React',
                'Angular',
                'Vue',
                'TypeScript',
                'JavaScript',
                'HTML',
                'CSS',
                'SASS',
                'Less',
                'StyledComponents',
                'MaterialUI',
                'React Native',
              ]
            : [
                'Figma',
                'Adobe XD',
                'Adobe Photoshop',
                'Adobe Illustrator',
                'Sketch',
                'Behance',
                'Canva',
              ]
        }
        size="m"
        typingInterval={300}
        deleteInterval={200}
        margin="0px 0px 50px 0"
        style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
      />
      <Container display="flex" gap="50px">
        <Button
          theme={isDarkMode ? 'l' : 'd'}
          width="200px"
          height="55px"
          text="Projects"
          href="#Projects"
          fontSize="1.5rem"
        />
        <Button
          theme={isDarkMode ? 'l' : 'd'}
          width="200px"
          height="55px"
          href="#about"
          text="About"
          fontSize="1.5rem"
        />
      </Container>
    </Container>
  </Container>
);
function Index() {
  const { isDarkMode, toggleTheme, isRightToLeft, toggleDirection } =
    useTheme();
  const [animateTransition, setAnimateTransition] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setAnimateTransition(true);
    const timeoutId = setTimeout(() => setAnimateTransition(false), 500);
    return () => clearTimeout(timeoutId);
  }, [isRightToLeft]);

  const homeSectionTop = calculateHomeSectionTop();
  const currentTheme = calculateCurrentTheme(isDarkMode, homeSectionTop);

  const stopSphereFollowScroll =
    typeof window !== 'undefined'
      ? homeSectionTop + window.innerHeight * 2 - 10
      : 0;

  const sphereStyle = calculateSphereStyle(
    scrollY < stopSphereFollowScroll ? scrollY : stopSphereFollowScroll
  );

  const translateXValue = calculateTranslateXValue(
    isDarkMode,
    isRightToLeft,
    scrollY
  );
  const blobStyle = calculateBlobStyle(
    scrollY < stopSphereFollowScroll ? scrollY : stopSphereFollowScroll,
    translateXValue
  );

  return (
    <>
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
          {renderSection(
            currentTheme ? 'l' : 'd',
            animateTransition,
            isRightToLeft,
            isDarkMode,
            blobStyle,
            sphereStyle
          )}
          <Container id="About" height="100vh">
            <AboutSection
              animateTransition={animateTransition}
              isRightToLeft={isRightToLeft}
              isDarkMode={isDarkMode}
            />
          </Container>
          <Container id="Work" height="100vh">
            <ProjectsSection
              isRightToLeft={isRightToLeft}
              isDarkMode={isDarkMode}
              animateTransition={animateTransition}
            />
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Index;
