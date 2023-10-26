import React, { useState, useEffect } from 'react';
import Img from 'next/image';
import s from './index.module.scss';
import Gif from './GifComponent';
import Txt from '../Text';
import Btn from '../Button';
import Ctn from '../Container';

interface ProjectCardProps {
  gif: string;
  title: string;
  description: string;
  icons: string[];
  demoUrl: string;
  github: string;
  theme: 'l' | 'd';
  cardLang: string[];
  filter?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  gif,
  title,
  description,
  icons,
  demoUrl,
  github,
  theme,
  cardLang,
  filter,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    if (filter && !cardLang.includes(filter)) {
      setAnimClass('bounceOut');
      setTimeout(() => setIsRendered(false), 400);
    } else {
      setIsRendered(true);
      setAnimClass('bounceIn');
    }
  }, [filter, cardLang]);

  if (!isRendered) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${s.card} ${theme === 'd' ? s.dark : s.light} ${
        s[animClass]
      } ${animClass}`}
      id={cardLang.join('')}
    >
      <Gif src={gif} isHovered={isHovered} />
      <Ctn
        direction="column"
        display="flex"
        padding="1rem"
        gap="1rem"
        className={s.textContainer}
        justify="space-between"
        height="100%"
      >
        <Ctn justify="space-between" display="flex" width="100%" align="center">
          <Txt
            text={title}
            theme={theme === 'l' ? 'text-d' : 'text-p'}
            size="1.3rem"
            weight="bold"
          />
          <Ctn display="flex" gap="0.5rem" align="center" justify="center">
            {icons.map((icon) => (
              <Img
                src={`/icons/${icon}.svg`}
                alt={`${icon} icon`}
                width={20}
                height={20}
                key={icon}
              />
            ))}
          </Ctn>
        </Ctn>
        <Txt text={description} theme={theme === 'l' ? 'text-d' : 'text-p'} />
        <div className={s.buttonContainer}>
          <Btn
            theme={theme}
            href={demoUrl}
            text="Demo"
            fontSize="1.2rem"
            width="100%"
          />
          <Btn
            theme={theme}
            href={github}
            text="Github"
            fontSize="1.2rem"
            width="100%"
          />
        </div>
      </Ctn>
    </div>
  );
};

export default ProjectCard;
