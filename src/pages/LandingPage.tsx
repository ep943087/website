import Typography from "../utils/Typography";
import styled from 'styled-components';
import PageAndSideNav from "../Layout/PageAndSideNav";
import Skill from "../utils/Skill";
import CppSVG from "../utils/svg/CppSVG";
import CSharpSVG from "../utils/svg/CSharpSVG";
import CssSVG from "../utils/svg/CssSVG";
import DotNetCoreSVG from "../utils/svg/dotNetCoreSVG";
import GithubSVG from "../utils/svg/GithubSVG";
import GitlabSVG from "../utils/svg/GitlabSVG";
import GitSVG from "../utils/svg/GitSVG";
import HtmlSVG from "../utils/svg/HtmlSVG";
import JavaScriptSVG from "../utils/svg/JavaScriptSVG";
import MySqlSVG from "../utils/svg/MySqlSVG";
import PhpSVG from "../utils/svg/PhpSVG";
import PythonSVG from "../utils/svg/PythonSVG";
import ReactSVG from "../utils/svg/ReactSVG";
import TypeScriptSVG from "../utils/svg/TypeScriptSVG";
import { SideBarLinkProps } from "../utils/SideBarLink";
import { createRef } from "react";

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
`;

const LandingPage = () => {

  const aboutRef = createRef<HTMLDivElement>();
  const workHistoryRef = createRef<HTMLDivElement>();
  const educationRef = createRef<HTMLDivElement>();
  const languageRef = createRef<HTMLDivElement>();
  const toolsRef = createRef<HTMLDivElement>();
  const frameworksRef = createRef<HTMLDivElement>();

  const sidebarLinks: SideBarLinkProps[] = [
    { label: 'About', reference: aboutRef },
    // { label: 'Work History', reference: workHistoryRef },
    // { label: 'Eductation', reference: educationRef },
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
          <Typography variant="body" textAlign="center">
            Hello, my name is Elias Proctor. I fell in love with programming in college, and the love hasn't stopped
            since. Currently, I work as a software developer at Paycom, and I also enjoy programming in my free time.
            I created this website using C# ASP.NET core for the backend, and React with Typescript for the frontend.
          </Typography>
        </div>
      </ImageAndTextContainer>
      {/* <div ref={workHistoryRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Work History</Typography>
      <WorkAndDateContainer style={{margin: '0 auto'}}>
        <Typography variant="subheading">Paycom</Typography>
        <Typography variant="subheading">May 2021 - Present</Typography>
      </WorkAndDateContainer>
      <div ref={educationRef} className="scrollToDiv" />
      <Typography variant="title" textAlign="center">Education</Typography> */}
      <div className="center-column">
        <div ref={languageRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Languages</Typography>
        <SkillsContainer>
          <Skill
            svg={<PhpSVG />}
            stars={4.5}
            title={"PHP"}
          />
          <Skill
            svg={<MySqlSVG />}
            stars={4.5}
            title="MySQL"
          />
          <Skill
            svg={<TypeScriptSVG />}
            stars={4.5}
            title="TypeScript"
          />
          <Skill
            svg={<JavaScriptSVG />}
            stars={5}
            title="JavaScript"
          />
          <Skill
            svg={<CppSVG />}
            stars={3}
            title="C++"
          />
          <Skill
            svg={<CSharpSVG />}
            stars={3}
            title="C#"
          />
          <Skill
            svg={<PythonSVG />}
            stars={3}
            title="Python"
          />
          <Skill
            svg={<CssSVG />}
            stars={4.5}
            title="CSS"
          />
          <Skill
            svg={<HtmlSVG />}
            stars={5}
            title="HTML"
          />
        </SkillsContainer>
        <div ref={frameworksRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Frameworks</Typography>
        <SkillsContainer>
          <Skill
            svg={<DotNetCoreSVG />}
            stars={2.5}
            title="ASP.NET Core"
          />
          <Skill
            svg={<ReactSVG />}
            stars={4.5}
            title="React"
          />
        </SkillsContainer>
        <div ref={toolsRef} className="scrollToDiv" />
        <Typography variant="title" textAlign="center">Tools</Typography>
        <SkillsContainer>
          <Skill
            svg={<GitSVG />}
            stars={4.5}
            title="Git"
          />
          <Skill
            svg={<GitlabSVG />}
            stars={4.5}
            title="GitLab"
          />
          <Skill
            svg={<GithubSVG />}
            stars={4.5}
            title="GitHub"
          />
        </SkillsContainer>
      </div>
    </PageAndSideNav>
  )
};

export default LandingPage;