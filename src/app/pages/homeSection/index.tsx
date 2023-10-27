import Container from '@/app/components/Container';
import React, { lazy } from 'react';
import Button from '@/app/components/Button';
import Blob from '@/app/components/Blob';
import Text from '@/app/components/Text';
import { useDevice } from '@/app/context/deviceContext';
const LazySphere = lazy(() => import('@/app/components/Sphere'));

const HomeSection = ({
  isDarkMode,
  isRightToLeft,
  blobStyle,
  sphereStyle,
  currentTheme,
}: {
  isDarkMode: boolean;
  isRightToLeft: boolean;
  blobStyle: React.CSSProperties;
  sphereStyle: React.CSSProperties;
  currentTheme: boolean;
}) => {
  const device = useDevice();
  return (
    <>
      <Container
        width={device === 'mobile' ? '100%' : '50%'}
        display="flex"
        justify="center"
        align="center"
        height={device === 'mobile' ? '50%' : 'auto'}
      >
        <Blob
          theme={isDarkMode ? 'd' : 'l'}
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
        align={device === 'mobile' ? 'center' : isRightToLeft ? 'start' : 'end'}
        width={device === 'mobile' ? '100%' : '50%'}
        height={device === 'mobile' ? '10%' : '100%'}
        gap="0.31rem"
      >
        <Text
          theme={isDarkMode ? 'text-d' : 'text-p'}
          width="auto"
          height="1.43rem"
          text={
            `Hello, i'm` +
            ' ' +
            (isRightToLeft ? 'Developer' : 'UX/UI Designer')
          }
          size="m"
          padding="0"
          style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
        />
        <Text
          theme={isDarkMode ? 'text-d' : 'text-p'}
          width="26.25rem"
          height="5.62rem"
          text={'David Guillen'}
          size="xl"
          style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
        />
        <Text
          theme={isDarkMode ? 'text-d' : 'text-p'}
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
          margin="0 0 3.12rem 0"
          style={{
            textAlign:
              device === 'mobile' ? 'center' : isRightToLeft ? 'start' : 'end',
          }}
        />
        <Container display="flex" gap="3.12rem">
          <Button
            theme={isDarkMode ? 'l' : 'd'}
            width="12.5rem"
            height="3.43rem"
            text="Projects"
            href="#Projects"
            fontSize="1.5rem"
          />
          <Button
            theme={isDarkMode ? 'l' : 'd'}
            width="12.5rem"
            height="3.43rem"
            href="#about"
            text="About"
            fontSize="1.5rem"
          />
        </Container>
      </Container>
    </>
  );
};

export default HomeSection;
