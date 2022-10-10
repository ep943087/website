import { ProjectType, simulationProjects, mathProjects, gameProjects } from '../config/projects';
import styled from 'styled-components';
import Typography from '../utils/Typography';
import PageAndSideNav from '../Layout/PageAndSideNav';
import { createRef } from 'react';
import { SideBarLinkProps } from '../utils/SideBarLink';
import { Link } from 'react-router-dom';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    font-size: 1.1rem;
  }
  a:hover {
    font-size: 1.3rem;
  }
`;

const ProjectContainer = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  margin: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: var(--light-color);
  color: var(--light-color);
  border-radius: 5px;
  transition: 600ms ease;
  -webkit-transition: 600ms ease;
  -moz-transition: 600ms ease;
  -ms-transition: 600ms ease;
  -o-transition: 600ms ease;
  padding: 10px;
  &:hover {
    border: 1px solid white;
  }
`;

const renderProjectsList = (projects: ProjectType[]) => (
  <ProjectsContainer>
    {projects.map((project, index) => {
      const projectContent = (
        <ProjectContainer style={{ backgroundImage: `url(${project.imageURL})` }}>
          <Typography color={`var(--${project.darkText ? 'dark' : 'light'}-color)`} variant="subheading">{project.caption}</Typography>
        </ProjectContainer>
      );
      if (project.externalLink) {
        return (
          <a key={index} href={project.linkURL} target="_blank" rel="noreferrer">
            {projectContent}
          </a>
        );
      } else {
        return (
          <Link to={project.linkURL}>
            {projectContent}
          </Link>
        );
      }
    })}
  </ProjectsContainer>
);

const ProjectsPage = () => {
  const projectsRef = createRef<HTMLDivElement>();
  const gamesRef = createRef<HTMLDivElement>();
  const simulationsRef = createRef<HTMLDivElement>();
  const mathRef = createRef<HTMLDivElement>();

  const sideBarLinks: SideBarLinkProps[] = [
    { label: 'Projects', reference: projectsRef },
    { label: 'Simulations', reference: simulationsRef },
    { label: 'Games', reference: gamesRef },
    { label: 'Math', reference: mathRef },
  ];

  return (
    <PageAndSideNav sidebarLinks={sideBarLinks}>
      <div ref={projectsRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Projects</Typography>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Typography variant="body" textAlign="center">
          Here are a few of my projects that I've implemented over a the past few years. Some of these projects
          come from my college years, and are hosted on Cameron University's <a href="http://ada.cameron.edu/~ep943087/practice/" rel="noreferrer" target="_blank">ADA Server</a>.
          Some are on my <a href="https://github.com/ep943087?tab=repositories" rel="noreferrer" target="_blank">Github account</a> and can be accessed through the Github Pages tab of some repositories.
        </Typography>
      </div>

      <div ref={simulationsRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Simulations</Typography>
      {renderProjectsList(simulationProjects)}

      <div ref={gamesRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Games</Typography>
      {renderProjectsList(gameProjects)}

      <div ref={mathRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Math</Typography>
      {renderProjectsList(mathProjects)}
    </PageAndSideNav>
  );
}

export default ProjectsPage;