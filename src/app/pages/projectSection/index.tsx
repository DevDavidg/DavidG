import React, { useState, useEffect, useMemo } from 'react';
import Container from '@/app/components/Container';
import ProjectCard from '@/app/components/ProjectCard';
import Text from '@/app/components/Text';
import FilterCard from '@/app/components/FilterCard';
import { addSpace } from '@/app/services/functions';
import { projectData } from '@/app/services/data';

interface ProjectsSectionProps {
  animateTransition: boolean;
  isRightToLeft: boolean;
  isDarkMode: boolean;
}

const ProjectsSection = ({
  animateTransition,
  isRightToLeft,
  isDarkMode,
}: ProjectsSectionProps) => {
  const [filter, setFilter] = useState('');

  const handleFilter = (lang: any) => {
    setFilter(lang);
  };

  const filteredProjectData = useMemo(() => {
    return projectData.filter((project) => {
      return (
        (!isRightToLeft &&
          project.isDesign &&
          (!filter || project.cardLang.includes(filter))) ||
        (isRightToLeft &&
          !project.isDesign &&
          (!filter || project.cardLang.includes(filter)))
      );
    });
  }, [isRightToLeft, filter]);

  useEffect(() => {
    setFilter('');
  }, [isRightToLeft]);

  return (
    <Container
      display="flex"
      justify="center"
      align="center"
      direction="column"
      height="100vh"
      id="Project"
      className={addSpace(
        animateTransition
          ? 'transition-animation'
          : 'transition-animation-right'
      )}
    >
      <FilterCard
        onFilter={handleFilter}
        lang={
          isRightToLeft
            ? [
                'React',
                'Angular',
                'Vue',
                'HTML',
                'CSS',
                'JS',
                'TS',
                'JQuery',
                'SASS',
                'Less',
                'Preact',
                'Pug',
                'Haml',
                'Next',
                'Nuxt',
                'styled-components',
                'styled-system',
                'Tailwind',
                'Bootstrap',
                'Material-UI',
              ]
            : ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator']
        }
      />
      <Container
        direction="column"
        gap="1rem"
        display="flex"
        padding={'2rem 0'}
      >
        <Text
          text="My portfolio"
          theme={isDarkMode ? 'text-d' : 'text-p'}
          size="s"
          weight="semibold"
        />
        <Text
          text="Recent Projects"
          theme={isDarkMode ? 'text-d' : 'text-p'}
          size="l"
          weight="bold"
        />
      </Container>
      <Container
        align="center"
        justify="center"
        display="flex"
        direction={isRightToLeft ? 'row-reverse' : 'row'}
        gap="1rem"
        className={addSpace(
          animateTransition
            ? 'transition-animation'
            : 'transition-animation-right'
        )}
        wrap
      >
        {filteredProjectData.map((project) => (
          <ProjectCard
            key={project.title}
            demoUrl={project.demoUrl}
            github={project.github}
            title={project.title}
            description={project.description}
            gif={project.gif}
            theme={isDarkMode ? 'l' : 'd'}
            icons={project.icons}
            cardLang={project.cardLang}
            filter={filter}
            isDesign={project.isDesign}
          />
        ))}
      </Container>
    </Container>
  );
};

export default ProjectsSection;