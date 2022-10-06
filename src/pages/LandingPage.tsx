import Typography from "../utils/Typography";
import styled from 'styled-components';
import PageAndSideNav from "../Layout/PageAndSideNav";
import Skill, { SkillProps } from "../utils/Skill";
import { SideBarLinkProps } from "../utils/SideBarLink";
import React, { createRef } from "react";
import PaycomSVG from "../utils/svg/PaycomSVG";
import CameronSVG from "../utils/svg/CameronSVG";
import { frameworkSkills, languageSkills, toolSkills } from "../config/skills";

const SkillsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 750px;

  > * {
    max-width: 120px;
  }
`;

const ImageAndTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  > * {
    width: 45%;
  }
  span {
    width: 100%;
  }
  img {
    max-width: 300px;
    border-radius: 5px;
  }

  @media (max-width: calc(655px + 250px)) {
    flex-direction: column;
    align-items: center;
    * {
      width: 100%;
    }
    img {
      padding-bottom: var(--container-padding);
    }
  }
`;

const WorkAndDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin-bottom: var(--container-padding);
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WorkHistoryText = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
  > span {
    margin-bottom: var(--container-padding);
  }
`;

const SVGContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  > div {
    width: 150px;
  }
`;

const renderSVG = (svg: React.ReactNode, link: string) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <SVGContainer>
        <div>{svg}</div>
      </SVGContainer>
    </a>
  );
};

const renderSkillsList = (skills: SkillProps[]) => (
  <SkillsContainer>
    {skills.sort((a, b) => b.stars - a.stars).map(skill=> (
      <Skill { ...skill }/>
    ))}
  </SkillsContainer>
);

const LandingPage = () => {

  const aboutRef = createRef<HTMLDivElement>();
  const workHistoryRef = createRef<HTMLDivElement>();
  const educationRef = createRef<HTMLDivElement>();
  const languageRef = createRef<HTMLDivElement>();
  const toolsRef = createRef<HTMLDivElement>();
  const frameworksRef = createRef<HTMLDivElement>();

  const sidebarLinks: SideBarLinkProps[] = [
    { label: 'About', reference: aboutRef },
    { label: 'Work History', reference: workHistoryRef },
    { label: 'Education', reference: educationRef },
    { label: 'Languages', reference: languageRef },
    { label: 'Frameworks', reference: frameworksRef },
    { label: 'Tools', reference: toolsRef },
  ];

  return (
    <PageAndSideNav sidebarLinks={sidebarLinks}>
      <div ref={aboutRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">About Elias Proctor</Typography>
      <ImageAndTextContainer>
        <img src="/portrait.jpg" alt="Portrait" />
        <div className="center">
          <Typography variant="body" textAlign="left">
            Hello, my name is Elias Proctor. I fell in love with programming in college, and the love hasn't stopped
            since. Currently, I work as a software developer at Paycom, and I also enjoy programming in my free time.
            I created this website using C# ASP.NET core for the backend, and React with Typescript for the frontend.
          </Typography>
        </div>
      </ImageAndTextContainer>

      <div ref={workHistoryRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Work History</Typography>
      {renderSVG(<PaycomSVG />, "https://paycom.com")}
      <WorkAndDateContainer style={{margin: '0 auto'}}>
        <Typography variant="subheading">Paycom</Typography>
        <Typography variant="subheading">May 2021 - Present</Typography>
      </WorkAndDateContainer>
      <WorkHistoryText>
        <Typography variant="body" isBlock>
          PHP/React/JavaScript development for Paycom&apos;s online application.
          Projects inculded Paycom's employee forms redesign and client forms. Problem 
          solving and fixing bugs written by other developers required debugging and communication
          with other teams.
        </Typography>
        <Typography variant="body" isBlock>
          Worked two months on Payroll Maintenance to handle live client tickets 
          and resolve issues through debugging and code fixes.
        </Typography>
        <Typography variant="body" isBlock>
          Programming standard used is object oriented and Model-View-Controller (MVC) through
          the Zend PHP Framework &#40;MVC&#41;
        </Typography>
        <Typography variant="body" isBlock>
          Front-end development included React with TypeScript, Jquery, and plain 
          JavaScript. Back-end development included PHP 7.4.6 &#40;includes data types&#41; and
          MySQL.
        </Typography>
        <Typography variant="body" isBlock>
          Used GitLab for version control, which required an understanding of basic git commands and
          how to create merge/pull requests. 
        </Typography>
      </WorkHistoryText>
      <WorkAndDateContainer style={{margin: '0 auto'}}>
        <Typography variant="subheading">Cameron University Tutor</Typography>
        <Typography variant="subheading">January 2020 - May 2021</Typography>
      </WorkAndDateContainer>
      <WorkAndDateContainer style={{ margin: '0 auto' }}>
        <Typography variant="body" isBlock>
          Helping students with programming courses such as Computer Science I &amp; II.
          Explaining C++ concepts such as data types, arrays, functions, classes, linked lists,
          binary search trees, recursion, pointers, etc. Students also came in for other 
          classes, such as database design and management.
        </Typography>
      </WorkAndDateContainer>

      <div ref={educationRef} className="scrollToDiv" style={{ marginTop: 'var(--container-padding)' }} />
      <Typography variant="title" textAlign="center">Education</Typography>
      {renderSVG(<CameronSVG />, "https://cameron.edu")}
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Typography variant="subheading" textAlign="center">January 2017 - May 2021</Typography>
        <ul>
          <li>
            <Typography variant="subheading">Bachelor&apos;s Degree in Computer Science</Typography>
          </li>
          <li>
            <Typography variant="subheading">Minor in Criminal Justice</Typography>
          </li>
          <li>
            <Typography variant="subheading">Associate&apos;s Degree in Information Technology</Typography>
          </li>
        </ul>
        <Typography variant="body" isBlock>
          Graduated at Cameron University with a 4.0 GPA.
        </Typography>
      </div>

      <div className="center-column">
        <div ref={languageRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Languages</Typography>
        {renderSkillsList(languageSkills)}

        <div ref={frameworksRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Frameworks</Typography>
        {renderSkillsList(frameworkSkills)}
        
        <div ref={toolsRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Tools</Typography>
        {renderSkillsList(toolSkills)}
      </div>
    </PageAndSideNav>
  )
};

export default LandingPage;