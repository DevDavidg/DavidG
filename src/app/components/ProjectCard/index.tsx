import React, { useState, useEffect } from 'react';
import Img from 'next/image';
import s from './index.module.scss';
import Gif from './GifComponent';
import Txt from '../Text';
import Btn from '../Button';
import Ctn from '../Container';
import Spinner from '../Loading';
import { useDevice } from '@/app/context/deviceContext';

export interface ProjectCardProps {
  gif: string;
  title: string;
  description: string;
  icons: string[];
  demoUrl: string;
  github: string;
  theme?: 'l' | 'd';
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
  theme = 'l',
  cardLang,
  filter,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [animClass, setAnimClass] = useState('');
  const device = useDevice();

  const [error, setError] = useState<Array<boolean>>(
    Array(icons.length).fill(false)
  );

  const remToPx = (rem: number) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

  const renderIcon = (icon: string, index: number) =>
    error[index] ? (
      <Spinner
        height={'1.25rem'}
        loading={true}
        theme={theme}
        borderWidth={2}
      />
    ) : (
      <Img
        src={`/icons/${icon}.svg`}
        alt={`${icon} icon`}
        width={remToPx(1.25)}
        height={remToPx(1.25)}
        onError={() => {
          const newError = [...error];
          newError[index] = true;
          setError(newError);
        }}
        key={icon}
      />
    );

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
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${s.card} ${theme === 'd' ? s.dark : s.light} ${
          s[animClass]
        } ${animClass}`}
        id={cardLang.join('')}
      >
        <Gif src={gif} isHovered={isHovered} theme={theme} />
        <Ctn
          direction="column"
          display="flex"
          padding="1rem"
          gap="1rem"
          className={s.textContainer}
          justify="space-between"
          height="100%"
        >
          <Ctn
            justify="space-between"
            display="flex"
            width="100%"
            align={
              device === 'mobile' || device === 'm-device' ? 'start' : 'center'
            }
            direction={
              device === 'mobile' || device === 'm-device' ? 'column' : 'row'
            }
            height="3.875rem"
          >
            <Txt
              text={title}
              theme={theme === 'l' ? 'text-d' : 'text-p'}
              size="1.3rem"
              weight="bold"
            />
            <Ctn display="flex" gap="0.5rem" align="center" justify="center">
              {icons.map((icon) => renderIcon(icon, icons.indexOf(icon)))}
            </Ctn>
          </Ctn>
          <Txt
            text={description}
            theme={theme === 'l' ? 'text-d' : 'text-p'}
            height="4.6875rem"
          />
          <div className={s.buttonContainer}>
            <Btn
              theme={theme}
              href={demoUrl}
              text={demoUrl === '' ? 'Private' : 'Demo'}
              fontSize="1.2rem"
              disabled={demoUrl === ''}
              width="100%"
            />
            <Btn
              theme={theme}
              href={github}
              text={github === '' ? 'Private' : 'Github'}
              fontSize="1.2rem"
              width="100%"
              disabled={github === ''}
            />
          </div>
        </Ctn>
      </div>
    </>
  );
};

export default ProjectCard;
