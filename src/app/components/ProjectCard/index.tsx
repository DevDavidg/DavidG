import React, { useState, useEffect } from 'react';
import Img from 'next/image';
import s from './index.module.scss';
import Gif from './GifComponent';
import Txt from '../Text';
import Btn from '../Button';
import Ctn from '../Container';
import Spinner from '../Loading';
import { useDevice } from '@/app/context/deviceContext';
import { remToPx } from '@/app/services/functions';
import { ProjectCardProps, RenderIconProps } from '@/app/services/models';

const RenderIcon: React.FC<RenderIconProps> = ({
  icon,
  index,
  error,
  setError,
  theme,
  hoveredIcon,
  setHoveredIcon,
}) => {
  const isIconHovered = icon === hoveredIcon;
  const uniqueKey = `${icon}-${Date.now()}-${index}`;
  return error[index] ? (
    <Spinner
      height={'1.25rem'}
      loading={true}
      theme={theme}
      borderWidth={2}
      key={uniqueKey}
    />
  ) : (
    <div
      className={s.iconWrapper}
      onMouseEnter={() => setHoveredIcon(icon)}
      onMouseLeave={() => setHoveredIcon(null)}
      key={uniqueKey}
    >
      <Img
        src={`/icons/${icon}.svg`}
        alt={`${icon} icon`}
        width={remToPx(1.25)}
        height={remToPx(1.25)}
        className={s.icon}
        onError={() => {
          const newError = [...error];
          newError[index] = true;
          setError(newError);
        }}
      />
      {isIconHovered && (
        <div className={s.dropdown}>
          <Txt text={icon} theme={'text-d'} size=".6rem" />
        </div>
      )}
    </div>
  );
};

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
  const parsedIcons =
    typeof icons === 'string' ? JSON.parse(icons.replace(/'/g, '"')) : icons;
  const parsedCardLang =
    typeof cardLang === 'string'
      ? JSON.parse(cardLang.replace(/'/g, '"'))
      : cardLang;

  const [isHovered, setIsHovered] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [animClass, setAnimClass] = useState('');
  const [error, setError] = useState<Array<boolean>>(
    Array(parsedIcons.length).fill(false)
  );
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const device = useDevice();

  useEffect(() => {
    const handleFilterChange = () => {
      if (filter && !parsedCardLang.includes(filter)) {
        setAnimClass('bounceOut');
        setTimeout(() => setIsRendered(false), 400);
      } else {
        setIsRendered(true);
        setAnimClass('bounceIn');
      }
    };
    handleFilterChange();
  }, [filter, parsedCardLang]);

  if (!isRendered) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${s.card} ${theme === 'd' ? s.dark : s.light} ${
        s[animClass]
      } ${animClass}`}
      id={Array.isArray(parsedCardLang) ? parsedCardLang.join('') : ''}
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
          <Ctn
            display="flex"
            gap={
              Array.isArray(parsedIcons) && parsedIcons.length >= 7
                ? '.3rem'
                : '.5rem'
            }
            align="center"
            justify="center"
            className={s.iconContainer}
          >
            {parsedIcons.map((icon: string, index: number) => (
              <RenderIcon
                icon={icon}
                index={index}
                error={error}
                setError={setError}
                theme={theme}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
                key={`${icon}`}
              />
            ))}
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
  );
};

export default ProjectCard;
