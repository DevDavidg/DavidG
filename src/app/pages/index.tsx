'use client';
import Container from '../components/Container';
import Sphere from '../components/Sphere';
import Switch from '../components/switch';
import Text from '../components/Text';
import { useTheme } from '../context/darkLightModeContext';

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
          />
          <Switch onChange={handleThemeChange} />
        </Container>
        <Container justify="center" display="flex" width="100%">
          <Text
            text={'Hello World!'}
            theme={isDarkMode ? 'text-p' : 'text-d'}
          />
          <Sphere height={'200px'} theme={isDarkMode ? 'd' : 'l'} />
        </Container>
      </Container>
    </>
  );
}

export default Index;
