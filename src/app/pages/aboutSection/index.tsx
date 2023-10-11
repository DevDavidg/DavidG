import Container from '@/app/components/Container';
import Text from '@/app/components/Text';
import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

const AboutSection = ({
  animateTransition,
  isRightToLeft,
  isDarkMode,
}: {
  animateTransition: boolean;
  isRightToLeft: boolean;
  isDarkMode: boolean;
}) => {
  const direction = isRightToLeft ? 'row' : 'row-reverse';
  const align = isRightToLeft ? 'start' : 'end';
  const textTheme = isDarkMode ? 'text-d' : 'text-p';
  const textStyle = { textAlign: isRightToLeft ? 'start' : 'end' };

  return (
    <Container
      height="100vh"
      id="about"
      display="flex"
      className={animateTransition ? 'transition-animation' : ''}
      direction={direction}
      padding={'70px 0px 0px 0px'}
    >
      <Container
        width="50%"
        height="100%"
        display="flex"
        justify="center"
        align={align}
        direction="column"
      >
        <Container display="flex" gap="30px" direction="column" align={align}>
          <Text
            theme={textTheme}
            width="123px"
            height="31px"
            text={'Who I am?'}
            style={
              {
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
          />
          <Text
            theme={textTheme}
            width="274px"
            height="184px"
            text={isRightToLeft ? 'I am a developer' : 'I am a designer'}
            style={
              {
                ...textStyle,
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
            size="xl"
            weight="bold"
          />
          <Text
            theme={textTheme}
            width="274px"
            height="60px"
            text={
              'My name is David, I am currently 21 years old, I live in Almagro CABA, Buenos Aires, Argentina'
            }
            style={
              {
                ...textStyle,
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
            margin="0px 0px 40% 0px"
          />
        </Container>
        <Container padding={'0px 0px 44px 0px'}>
          <Text
            theme={textTheme}
            weight="semibold"
            width="100px"
            height="31px"
            text={'Contact'}
            size="sm"
            style={
              {
                ...textStyle,
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
          />
        </Container>
        <Container display="flex" gap="23px" direction="column">
          <Container
            display="flex"
            gap="10px"
            align="center"
            direction={direction}
            href="https://www.linkedin.com/in/david-guillen-5074281b8/"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{ color: !isDarkMode ? '#fff' : '#000' }}
            />
            <Text
              theme={textTheme}
              width="65px"
              height="25px"
              text={'Linkedin'}
              style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
            />
          </Container>
          <Container
            display="flex"
            gap="10px"
            align="center"
            direction={direction}
          >
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: !isDarkMode ? '#fff' : '#000' }}
            />
            <Text
              theme={textTheme}
              width="55px"
              height="25px"
              text={'Github'}
              style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
              href="www.github.com"
            />
          </Container>
          <Container
            display="flex"
            gap="10px"
            align="center"
            direction={direction}
            href="mailto:dev.davidg@gmail.com"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: !isDarkMode ? '#fff' : '#000' }}
            />
            <Text
              theme={textTheme}
              width="55px"
              height="25px"
              text={'Email'}
              style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default AboutSection;
