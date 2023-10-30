import Container from '@/app/components/Container';
import Text from '@/app/components/Text';
import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  addSpace,
  getAlign,
  getDirection,
  getTextStyle,
  getTextTheme,
} from '@/app/services/functions';
import theme from '@/app/stylesheets/theme.module.sass';

const AboutSection = ({
  animateTransition,
  isRightToLeft,
  isDarkMode,
}: {
  animateTransition: boolean;
  isRightToLeft: boolean;
  isDarkMode: boolean;
}) => {
  const direction = getDirection(isRightToLeft);
  const align = getAlign(isRightToLeft);
  const textTheme = getTextTheme(isDarkMode);
  const textStyle = getTextStyle(isRightToLeft);

  return (
    <Container
      height="100vh"
      id="about"
      display="flex"
      className={addSpace(
        animateTransition
          ? 'transition-animation'
          : 'transition-animation-right'
      )}
      direction={direction}
      padding={'4.375rem 0 0 0'}
    >
      <Container
        width="50%"
        height="100%"
        display="flex"
        justify="center"
        align={align}
        direction="column"
      >
        <Container
          display="flex"
          gap="1.87rem"
          direction="column"
          align={align}
        >
          <Text
            theme={textTheme}
            width="7.68rem"
            height="1.93rem"
            text={'Who I am?'}
            style={
              {
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
          />
          <Text
            theme={textTheme}
            width="17.125rem"
            height="11.5rem"
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
            width="17.125rem"
            height="3.75rem"
            text={
              'My name is David, I am currently 21 years old, I live in Almagro CABA, Buenos Aires, Argentina'
            }
            style={
              {
                ...textStyle,
                textAlign: isRightToLeft ? 'start' : 'end',
              } as React.CSSProperties
            }
            margin="0 0 40% 0"
          />
        </Container>
        <Container padding={'0 0 2.75rem 0'}>
          <Text
            theme={textTheme}
            weight="semibold"
            width="6.25rem"
            height="1.93rem"
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
        <Container display="flex" gap="1.43rem" direction="column">
          <Container
            display="flex"
            gap="0.62rem"
            align="center"
            direction={direction}
            href="https://www.linkedin.com/in/david-guillen-5074281b8/"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{ color: !isDarkMode ? theme.w : theme.d }}
            />
            <Text
              theme={textTheme}
              width="4rem"
              height="1.56rem"
              text={'Linkedin'}
              style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
            />
          </Container>
          <Container
            display="flex"
            gap="0.62rem"
            align="center"
            direction={direction}
          >
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: !isDarkMode ? theme.w : theme.d }}
            />
            <Text
              theme={textTheme}
              width="3.43rem"
              height="1.56rem"
              text={'Github'}
              style={{ textAlign: isRightToLeft ? 'start' : 'end' }}
              href="www.github.com"
            />
          </Container>
          <Container
            display="flex"
            gap="0.62rem"
            align="center"
            direction={direction}
            href="mailto:dev.davidg@gmail.com"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: !isDarkMode ? theme.w : theme.d }}
            />
            <Text
              theme={textTheme}
              width="3.43rem"
              height="1.56rem"
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
