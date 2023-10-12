import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import GifComponent from './GifComponent';
import Text from '../Text';
import Button from '../Button';
import Container from '../Container';

interface Props {
  gif: string;
  title: string;
  description: string;
  icons: string[];
  demoUrl: string;
  github: string;
  theme: 'l' | 'd';
}

const ProjectCard: React.FC<Props> = ({
  gif,
  title,
  description,
  icons,
  demoUrl,
  github,
  theme,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${styles.card} ${theme === 'd' ? styles.dark : styles.light}`}
    >
      <GifComponent src={gif} isHovered={isHovered} />
      <Container
        direction="column"
        display="flex"
        padding="1rem"
        gap="1rem"
        className={styles.textContainer}
        justify="space-between"
        height="100%"
      >
        <Container
          justify="space-between"
          display="flex"
          width="100%"
          align="center"
        >
          <Text
            text={title}
            theme={theme === 'l' ? 'text-d' : 'text-p'}
            size="1.3rem"
            weight="bold"
          />
          <Container
            display="flex"
            gap="0.5rem"
            align="center"
            justify="center"
          >
            {icons?.map((icon) => (
              <Image
                src={`/icons/${icon}.svg`}
                alt={`${icon} icon`}
                width={20}
                height={20}
                key={icon}
              />
            ))}
          </Container>
        </Container>
        <Text text={description} theme={theme === 'l' ? 'text-d' : 'text-p'} />
        <div className={styles.buttonContainer}>
          <Button
            theme={theme}
            href={demoUrl}
            text="Demo"
            fontSize="1.2rem"
            width="100%"
          />
          <Button
            theme={theme}
            href={github}
            text="Github"
            fontSize="1.2rem"
            width="100%"
          />
        </div>
      </Container>
    </div>
  );
};

export default ProjectCard;
