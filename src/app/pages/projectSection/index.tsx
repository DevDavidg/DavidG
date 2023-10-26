import React, { useState } from 'react';
import Container from '@/app/components/Container';
import ProjectCard from '@/app/components/ProjectCard';
import Text from '@/app/components/Text';
import FilterCard from '@/app/components/FilterCard';

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

  return (
    <Container
      display="flex"
      justify="center"
      align="center"
      direction="column"
      height="100vh"
      id="Project"
      className={animateTransition ? 'transition-animation' : ''}
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
        className={animateTransition ? 'transition-animation' : ''}
        styles={{
          minHeight: '400px !important',
        }}
        wrap
      >
        <ProjectCard
          demoUrl="https://www.google.com"
          github="https://www.google.com"
          title="Project 1"
          description="SDAKFSDJLKFJLHKDSF SDFSDKJFSDLJFKJSDH FSDFHJHKJKJLFD."
          gif="/dancing-animated-cute-duck-dbzlbpbscz1jao0v.gif"
          theme={isDarkMode ? 'l' : 'd'}
          icons={['react', 'angular', 'haml']}
          cardLang={['React', 'Angular', 'Haml']}
          filter={filter}
        />
        <ProjectCard
          demoUrl="https://www.google.com"
          github="https://www.google.com"
          title="Project 1"
          description="SDAKFSDJLKFJLHKDSF SDFSDKJFSDLJFKJSDH FSDFHJHKJKJLFD."
          gif="/dancing-animated-cute-duck-dbzlbpbscz1jao0v.gif"
          theme={isDarkMode ? 'l' : 'd'}
          icons={['react', 'angular', 'haml']}
          cardLang={['Vue', 'Angular', 'Haml']}
          filter={filter}
        />
        <ProjectCard
          demoUrl="https://www.google.com"
          github="https://www.google.com"
          title="Project 1"
          description="SDAKFSDJLKFJLHKDSF SDFSDKJFSDLJFKJSDH FSDFHJHKJKJLFD."
          gif="/dancing-animated-cute-duck-dbzlbpbscz1jao0v.gif"
          theme={isDarkMode ? 'l' : 'd'}
          icons={['react', 'angular', 'haml']}
          cardLang={['Vue', 'Angular', 'Haml']}
          filter={filter}
        />
      </Container>
    </Container>
  );
};

export default ProjectsSection;
