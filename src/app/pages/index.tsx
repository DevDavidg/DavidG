'use client';
import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react';
import Navbar from '@/app/modules/navbar';
const HomeSection = lazy(() => import('@/app/pages/homeSection'));
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
import Spinner from '../components/Loading';

const useScrollHandler = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inAboutSection, setInAboutSection] = useState(false);

  const handleScroll = useCallback(() => {
    const aboutElement = document.getElementById('Home');
    const workElement = document.getElementById('Work');
    if (aboutElement && workElement) {
      setScrollY(window.scrollY);
      const isInAboutSection =
        window.scrollY >= aboutElement.offsetTop &&
        window.scrollY < workElement.offsetTop;
      setInAboutSection(isInAboutSection);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollY, inAboutSection };
};

const getDirection = (device: string, isRightToLeft: boolean) => {
  if (device === 'mobile') return 'column-reverse';
  return isRightToLeft ? 'row-reverse' : 'row';
};

const getStyles = (
  inAboutSection: boolean,
  scrollY: number,
  stopSphereFollowScroll: number,
  isDarkMode: boolean,
  isRightToLeft: boolean
) => {
  let finalScrollY = 0;
  if (inAboutSection) {
    finalScrollY =
      scrollY < stopSphereFollowScroll ? scrollY : stopSphereFollowScroll;
  }

  const translateXValue = inAboutSection
    ? calculateTranslateXValue(isDarkMode, isRightToLeft, scrollY)
    : 0;
  const blobStyle = inAboutSection
    ? calculateBlobStyle(finalScrollY, String(translateXValue))
    : {};
  const sphereStyle = inAboutSection ? calculateSphereStyle(finalScrollY) : {};

  return { blobStyle, sphereStyle };
};

function Index(): React.JSX.Element {
  const { isDarkMode, toggleTheme, isRightToLeft, toggleDirection } =
    useTheme();
  const device = useDevice();
  const [animateTransition, setAnimateTransition] = useState(true);
  const { scrollY, inAboutSection } = useScrollHandler();

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

  const { blobStyle, sphereStyle } = getStyles(
    inAboutSection,
    scrollY,
    stopSphereFollowScroll,
    isDarkMode,
    isRightToLeft
  );
  const direction = getDirection(device, isRightToLeft);

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
            id="Home"
            align="center"
            justify="center"
            display="flex"
            className={addSpace(
              animateTransition
                ? 'transition-animation'
                : 'transition-animation-right'
            )}
            direction={direction}
          >
            <Suspense
              fallback={
                <Spinner
                  loading={true}
                  background={false}
                  theme={isDarkMode ? 'd' : 'l'}
                />
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
                  device === 'mobile'
                    ? { top: 'auto', bottom: '0' }
                    : sphereStyle
                }
              />
            </Suspense>
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
