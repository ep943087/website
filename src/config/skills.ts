import { SkillProps } from "../utils/Skill";
import CppSVG from "../utils/svg/CppSVG";
import CSharpSVG from "../utils/svg/CSharpSVG";
import CssSVG from "../utils/svg/CssSVG";
import DotNetCoreSVG from "../utils/svg/dotNetCoreSVG";
import GithubSVG from "../utils/svg/GithubSVG";
import GitlabSVG from "../utils/svg/GitlabSVG";
import GitSVG from "../utils/svg/GitSVG";
import HtmlSVG from "../utils/svg/HtmlSVG";
import JavaScriptSVG from "../utils/svg/JavaScriptSVG";
import JavaSVG from "../utils/svg/JavaSVG";
import JiraSVG from "../utils/svg/JiraSVG";
import JQuerySVG from "../utils/svg/JQuerySVG";
import MySqlSVG from "../utils/svg/MySqlSVG";
import NodeJsSVG from "../utils/svg/NodeJsSVG";
import PhpSVG from "../utils/svg/PhpSVG";
import PythonSVG from "../utils/svg/PythonSVG";
import ReactSVG from "../utils/svg/ReactSVG";
import TypeScriptSVG from "../utils/svg/TypeScriptSVG";

export const languageSkills: SkillProps[] = [
  { svg: PhpSVG, stars: 4.5, title: "PHP" },
  { svg: MySqlSVG, stars: 4.5, title: "MySQL" },
  { svg: TypeScriptSVG, stars: 4.5, title: "TypeScript" },
  { svg: JavaScriptSVG, stars: 5, title: "JavaScript" },
  { svg: CppSVG, stars: 3, title: "C++" },
  { svg: CSharpSVG, stars: 3, title: "C#"},
  { svg: PythonSVG, stars: 3, title: "Python" },
  { svg: CssSVG, stars: 4.5, title: "CSS" },
  { svg: HtmlSVG, stars: 5, title: "HTML" },
  { svg: JavaSVG, stars: 2.5, title: "Java" },
];

export const frameworkSkills: SkillProps[] = [
  { svg: NodeJsSVG, stars: 4, title: "Nodejs" },
  { svg: JQuerySVG, stars: 3.5, title: "JQuery" },
  { svg: DotNetCoreSVG, stars: 2.5, title: "ASP.NET Core" },
  { svg: ReactSVG, stars: 4.5, title: "React" },
];

export const toolSkills: SkillProps[] = [
  { svg: GitSVG, stars: 4.5, title: "Git" },
  { svg: GitlabSVG, stars: 4.5, title: "GitLab" },
  { svg: GithubSVG, stars: 4.5, title: "GitHub" },
  { svg: JiraSVG, stars: 4, title: "Jira" },
];
