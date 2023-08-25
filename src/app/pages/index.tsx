'use client';
import Container from '../components/Container';
import Sphere from '../components/Sphere';
import Switch from '../components/switch';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';
import { FadeInContextProvider, AnimationType } from '../context/fadeContext';

function Index() {
  const { isDarkMode, toggleTheme } = useTheme();
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <>
      <Container width="100%" height="100vh" theme={isDarkMode ? 'd' : 'l'}>
        <Container
          justify="space-between"
          display="flex"
          width="100%"
          padding="1rem"
        >
          <Text
            text={'<>DevDavidG'}
            theme={isDarkMode ? 'text-p' : 'text-d'}
            href="https://www.github.com/DevDavidG"
            width="120px"
          />
          <Switch onChange={handleThemeChange} />
        </Container>
        <Container
          justify="center"
          display="flex"
          width="100%"
          direction="column"
        >
          <Text
            typingText={[
              'Hola, soy David',
              'Soy un desarrollador web',
              'Me gusta el diseño',
              'Me gusta el desarrollo',
              'Me gusta el café',
            ]}
            width="220px"
            theme={isDarkMode ? 'text-p' : 'text-d'}
          />
          <FadeInContextProvider animation={AnimationType.FadeUp} duration={1}>
            <Sphere height={'200px'} theme={isDarkMode ? 'd' : 'l'} />
          </FadeInContextProvider>
        </Container>
      </Container>
    </>
  );
}

export default Index;
