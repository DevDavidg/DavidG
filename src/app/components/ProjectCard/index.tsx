import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Img from 'next/image';
import s from './index.module.scss';
import GifComponent from './GifComponent';
import Container from '../Container';
import Spinner from '../Loading';
import { ProjectCardProps, RenderIconProps } from '@/app/services/models';
import Button from '../Button';
import { useDevice } from '@/app/context/deviceContext';
import { remToPx } from '@/app/services/functions';
import TextComponent from '../Text';

const RenderIcon = React.memo<RenderIconProps>(
  ({ icon, index, error, setError, theme, hoveredIcon, setHoveredIcon }) => {
    const isIconHovered = icon === hoveredIcon;
    const uniqueKey = useMemo(
      () => `${icon}-${Date.now()}-${index}`,
      [icon, index]
    );

    const handleError = useCallback(() => {
      const newError = [...error];
      newError[index] = true;
      setError(newError);
    }, [error, index, setError]);

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
          onError={handleError}
        />
        {isIconHovered && (
          <div className={s.dropdown}>
            <TextComponent text={icon} theme={'text-d'} size=".6rem" />
          </div>
        )}
      </div>
    );
  }
);

RenderIcon.displayName = 'RenderIcon';

const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({
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
    const parsedIcons = useMemo(
      () =>
        typeof icons === 'string'
          ? JSON.parse(icons.replace(/'/g, '"'))
          : icons,
      [icons]
    );

    const parsedCardLang = useMemo(
      () =>
        typeof cardLang === 'string'
          ? JSON.parse(cardLang.replace(/'/g, '"'))
          : cardLang,
      [cardLang]
    );

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
        <GifComponent src={gif} isHovered={isHovered} theme={theme} />
        <Container
          direction="column"
          display="flex"
          padding="1rem"
          gap="1rem"
          className={s.textContainer}
          justify="space-between"
          height="100%"
        >
          <Container
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
            <TextComponent
              text={title}
              theme={theme === 'l' ? 'text-d' : 'text-p'}
              size="1.3rem"
              weight="bold"
            />
            <Container
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
            </Container>
          </Container>
          <TextComponent
            text={description}
            theme={theme === 'l' ? 'text-d' : 'text-p'}
            height="4.6875rem"
          />
          <div className={s.buttonContainer}>
            <Button
              theme={theme}
              href={demoUrl}
              text={demoUrl === '' ? 'Private' : 'Demo'}
              fontSize="1.2rem"
              disabled={demoUrl === ''}
              width="100%"
              ariaLabel="Demo"
            />
            <Button
              theme={theme}
              href={github}
              text={github === '' ? 'Private' : 'Github'}
              fontSize="1.2rem"
              width="100%"
              disabled={github === ''}
              ariaLabel="Github"
            />
          </div>
        </Container>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
