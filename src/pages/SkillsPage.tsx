import styled from "styled-components";
import Page from "../Layout/Page";
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
import Typography from "../utils/Typography";

const SkillsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;

  > * {
    max-width: 150px;
  }
`;

const SkillsPage = () => {
  return (
    <Page>
      <div className="center-column">
        <Typography variant="title" textAlign="center">Skills</Typography>
        
        <Typography variant="subheading" textAlign="center">Languages</Typography>
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
        
        <Typography variant="subheading" textAlign="center">Frameworks</Typography>
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

        <Typography variant="subheading" textAlign="center">Tools</Typography>
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
    </Page>
  );
};

export default SkillsPage;