import Container from '@/app/components/Container';
import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  addSpace,
  getDirection,
  getTextStyle,
  getTextTheme,
} from '@/app/services/functions';
import theme from '@/app/stylesheets/theme.module.sass';
import { useDevice } from '@/app/context/deviceContext';
import TextComponent from '@/app/components/TextComponent';

const getAlignValue = (isRightToLeft: boolean, device: string) => {
  if (device === 'mobile') {
    return 'center';
  }
  return isRightToLeft ? 'start' : 'end';
};

const getTextAlignValue = (
  isRightToLeft: boolean,
  device: string,
  isSpecialCase: boolean = false
) => {
  if (device === 'mobile') {
    return 'center';
  }
  if (isSpecialCase) {
    return 'justify';
  }
  return isRightToLeft ? 'start' : 'end';
};

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
  const textTheme = getTextTheme(isDarkMode);
  const textStyle = getTextStyle(isRightToLeft);
  const device = useDevice();

  return (
    <Container
      height={device === 'mobile' ? 'auto' : '100vh'}
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
        width={device === 'mobile' ? '100%' : '50%'}
        height="100%"
        display="flex"
        justify="center"
        align={getAlignValue(isRightToLeft, device)}
        direction="column"
      >
        <Container
          display="flex"
          gap="1.87rem"
          direction="column"
          align={getAlignValue(isRightToLeft, device)}
        >
          <TextComponent
            theme={textTheme}
            width="7.68rem"
            height="1.93rem"
            text={'Who I am?'}
            style={{
              ...textStyle,
              textAlign: getTextAlignValue(isRightToLeft, device),
            }}
          />
          <TextComponent
            theme={textTheme}
            width="17.125rem"
            height="11.5rem"
            text={isRightToLeft ? 'I am a developer' : 'I am a designer'}
            style={{
              ...textStyle,
              textAlign: getTextAlignValue(isRightToLeft, device),
            }}
            size="xl"
            weight="bold"
          />
          <TextComponent
            theme={textTheme}
            width="17.125rem"
            height="3.75rem"
            text={
              'My name is David, I am currently 21 years old, I live in Almagro CABA, Buenos Aires, Argentina'
            }
            style={{
              ...textStyle,
              textAlign: getTextAlignValue(isRightToLeft, device),
            }}
            margin="0 0 40% 0"
          />
        </Container>
        <Container padding={'0 0 2.75rem 0'}>
          <TextComponent
            theme={textTheme}
            weight="semibold"
            width="6.25rem"
            height="1.93rem"
            text={'Contact'}
            size="sm"
            style={{
              ...textStyle,
              textAlign: getTextAlignValue(isRightToLeft, device),
            }}
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
            <TextComponent
              theme={textTheme}
              width="4rem"
              height="1.56rem"
              text={'Linkedin'}
              style={{ textAlign: getTextAlignValue(isRightToLeft, device) }}
            />
          </Container>
          <Container
            display="flex"
            gap="0.62rem"
            align="center"
            direction={direction}
            href="https://github.com/DevDavidg"
          >
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: !isDarkMode ? theme.w : theme.d }}
            />
            <TextComponent
              theme={textTheme}
              width="3.43rem"
              height="1.56rem"
              text={'Github'}
              style={{ textAlign: getTextAlignValue(isRightToLeft, device) }}
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
            <TextComponent
              theme={textTheme}
              width="3.43rem"
              height="1.56rem"
              text={'Email'}
              style={{ textAlign: getTextAlignValue(isRightToLeft, device) }}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default AboutSection;
