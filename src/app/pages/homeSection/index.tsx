import React, { useMemo, useCallback } from 'react';
import Container from '@/app/components/Container';
import Blob from '@/app/components/Blob';
import TextComponent from '@/app/components/TextComponent';
import ButtonComponent from '@/app/components/ButtonComponent';
import { useDevice } from '@/app/context/deviceContext';
import { getTextTheme, getTheme } from '@/app/services/functions';
import { DeviceSpecificStyles, HomeSectionProps } from '@/app/services/models';
const LazySphere = React.lazy(() => import('@/app/components/Sphere'));

const HomeSection: React.FC<HomeSectionProps> = ({
  isDarkMode,
  isRightToLeft,
  blobStyle,
  sphereStyle,
  currentTheme,
}) => {
  const device = useDevice();
  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);
  const textTheme = useMemo(() => getTextTheme(isDarkMode), [isDarkMode]);

  let alignDirection: 'start' | 'end' | 'center';
  if (device === 'mobile') {
    alignDirection = 'center';
  } else if (isRightToLeft) {
    alignDirection = 'start';
  } else {
    alignDirection = 'end';
  }

  const align = useMemo(() => alignDirection, [alignDirection]);

  const deviceSpecificStyles = useMemo<DeviceSpecificStyles>(
    () => ({
      containerWidth: device === 'mobile' ? '100%' : '50%',
      containerHeight: device === 'mobile' ? '50%' : 'auto',
      textMargin: device === 'mobile' ? '0 0 1rem 0' : '0 0 3.12rem 0',
      buttonGap: device === 'mobile' ? '0.5rem' : '3.12rem',
    }),
    [device]
  );

  const renderTextComponent = useCallback(
    (
      width: string,
      height: string,
      text: string,
      size: 's' | 'm' | 'l' | 'xl',
      additionalStyle: React.CSSProperties = {}
    ) => (
      <TextComponent
        theme={textTheme}
        width={width}
        height={height}
        text={text}
        size={size}
        style={{ textAlign: align, ...additionalStyle }}
      />
    ),
    [align, textTheme]
  );

  return (
    <>
      <Container
        width={deviceSpecificStyles.containerWidth}
        display="flex"
        justify="center"
        align="center"
        height={deviceSpecificStyles.containerHeight}
      >
        <Blob
          theme={theme}
          width="37.5rem"
          height="31.25rem"
          top="50%"
          left="50%"
          style={blobStyle}
        />
        <LazySphere
          theme={currentTheme ? 'l' : 'd'}
          width="9.37rem"
          height="9.37rem"
          style={sphereStyle}
        />
      </Container>
      <Container
        display="flex"
        direction="column"
        justify="center"
        align={align}
        width={deviceSpecificStyles.containerWidth}
        height={device === 'mobile' ? '10%' : '100%'}
        gap="0.31rem"
      >
        {renderTextComponent(
          'auto',
          '1.43rem',
          `Hello, i'm ${isRightToLeft ? 'Developer' : 'UX/UI Designer'}`,
          'm'
        )}
        {renderTextComponent('26.25rem', '5.62rem', 'David Guillen', 'xl')}
        <TextComponent
          theme={textTheme}
          width="15.62rem"
          height="1.56rem"
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
          margin={deviceSpecificStyles.textMargin}
          style={{ textAlign: align }}
        />
        <Container display="flex" gap={deviceSpecificStyles.buttonGap}>
          <ButtonComponent
            theme={isDarkMode ? 'l' : 'd'}
            width="12.5rem"
            height="3.43rem"
            text="Projects"
            href="#Projects"
            fontSize="1.5rem"
            ariaLabel="Projects"
          />
          <ButtonComponent
            theme={isDarkMode ? 'l' : 'd'}
            width="12.5rem"
            height="3.43rem"
            href="#about"
            text="About"
            fontSize="1.5rem"
            ariaLabel="About"
          />
        </Container>
      </Container>
    </>
  );
};

export default HomeSection;
