'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/modules/navbar';
import HomeSection from '@/app/pages/homeSection';
import AboutSection from '@/app/pages/aboutSection';
import ProjectsSection from '@/app/pages/projectSection';
import { useTheme } from '@/app/context/darkLightModeContext';
import { useDevice } from '@/app/context/deviceContext';
import {
  addSpace,
  calculateBlobStyle,
  calculateCurrentTheme,
  calculateHomeSectionTop,
  calculateSphereStyle,
  calculateTranslateXValue,
} from '@/app/services/functions';
import Container from '@/app/components/Container';

function Index() {
  const { isDarkMode, toggleTheme, isRightToLeft, toggleDirection } =
    useTheme();
  const device = useDevice();
  const [animateTransition, setAnimateTransition] = useState(true);
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
        animateTransition={animateTransition}
      />
      <Container
        theme={isDarkMode ? 'd' : 'l'}
        display="flex"
        justify="center"
        align="center"
      >
        <Container
          width={`calc(100vw - ${isRightToLeft ? '9.37rem' : '18.75rem'})`}
          theme={isDarkMode ? 'd' : 'l'}
        >
          <Container
            height="100vh"
            id="home"
            align="center"
            justify="center"
            display="flex"
            className={addSpace(
              animateTransition
                ? 'transition-animation'
                : 'transition-animation-right'
            )}
            direction={
              device === 'mobile'
                ? 'column-reverse'
                : isRightToLeft
                ? 'row-reverse'
                : 'row'
            }
          >
            <HomeSection
              isDarkMode={isDarkMode}
              isRightToLeft={isRightToLeft}
              blobStyle={
                device === 'mobile' ? { top: 'auto', bottom: '0' } : blobStyle
              }
              currentTheme={device === 'mobile' ? isDarkMode : currentTheme}
              sphereStyle={
                device === 'mobile' ? { top: 'auto', bottom: '0' } : sphereStyle
              }
            />
          </Container>
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
