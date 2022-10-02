import projects from '../config/projects';
import styled from 'styled-components';
import Page from '../Layout/Page';
import Typography from '../utils/Typography';

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
  width: 300px;
  height: 400px;
  border: 1px solid black;
  margin: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  background-color: var(--light-color);
  color: var(--dark-color);
  border-radius: 5px;
  transition: 600ms ease;
  -webkit-transition: 600ms ease;
  -moz-transition: 600ms ease;
  -ms-transition: 600ms ease;
  -o-transition: 600ms ease;
  padding: 10px;
  &:hover {
    width: 310px; 
    height: 410px;
  }
`;

const ProjectsPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  flex-wrap: wrap;
`;

const ProjectsPage = () => {
  return (
    <Page>
      <Typography variant="title" textAlign="center">Projects</Typography>
      <ProjectsPageContainer>
        <ProjectsContainer>
          {projects.map((project, index) =>
            <a key={index} href={project.linkURL} target="_blank" rel="noreferrer">
              <ProjectContainer style={{ backgroundImage: `url(${project.imageURL})`}}>
                <Typography variant="subheading" color="var(--dark-color)">{project.caption}</Typography>
              </ProjectContainer>
            </a>
          )}
        </ProjectsContainer>
      </ProjectsPageContainer>
    </Page>
  );
}

export default ProjectsPage;