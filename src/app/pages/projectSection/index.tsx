import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Container from '@/app/components/Container';
import ProjectCard from '@/app/components/ProjectCard';
import FilterCard from '@/app/components/FilterCard';
import { addSpace } from '@/app/services/functions';
import { useDevice } from '@/app/context/deviceContext';
import { ProjectCardProps, ProjectsSectionProps } from '@/app/services/models';
import TextComponent from '@/app/components/TextComponent';

const ProjectsSection = ({
  animateTransition,
  isRightToLeft,
  isDarkMode,
}: ProjectsSectionProps) => {
  const [filter, setFilter] = useState('');
  const [projectData, setProjectData] = useState<ProjectCardProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const device = useDevice();

  const handleFilter = useCallback((lang: string) => {
    setFilter(lang);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        'https://drfapiprojects.onrender.com/projectcards/'
      );
      console.log(response.headers.get('Cache-Control'));
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error as Error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
  }, [isRightToLeft, filter, projectData]);

  useEffect(() => {
    setFilter('');
  }, [isRightToLeft]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Container
        display="flex"
        justify="start"
        align="center"
        direction="column"
        height={device === 'mobile' ? 'auto' : '100vh'}
        id="Project"
        padding={'5rem 0 0 0'}
        className={addSpace(
          animateTransition
            ? 'transition-animation'
            : 'transition-animation-right'
        )}
      >
        {error ? <div>Error loading projects: {error.message}</div> : <></>}

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
                  'CoffeeScript',
                  'TS',
                  'Django',
                  'DRF',
                  'Python',
                  'Sass',
                  'Less',
                  'Preact',
                  'Pug',
                  'HAML',
                  'Next',
                  'StyledComponents',
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
          <TextComponent
            text="My portfolio"
            theme={isDarkMode ? 'text-d' : 'text-p'}
            size="s"
            weight="semibold"
          />
          <TextComponent
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
          gap={device === 'mobile' ? '2rem' : '1rem'}
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
            />
          ))}
        </Container>
      </Container>
    </React.Suspense>
  );
};

export default ProjectsSection;
