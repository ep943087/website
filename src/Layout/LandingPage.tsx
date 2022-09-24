import React from 'react';
import projects from '../config/projects';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
  background-color: var(--dark-color);
  border-radius: 5px;
  transition: 600ms ease;
  padding: 10px;
  &:hover {
    width: 310px; 
    height: 410px;
  }
`;

const LandingPage = () => {
  return (
    <div>
      <ProjectsContainer>
        {projects.map((project, index) =>
          <a key={index} href={project.linkURL} target="_blank" rel="noreferrer">
            <ProjectContainer style={{ backgroundImage: `url(${project.imageURL})`}}>
              <p>{project.caption}</p>
            </ProjectContainer>
          </a>
        )}
      </ProjectsContainer>
    </div>
  );
}

export default LandingPage;