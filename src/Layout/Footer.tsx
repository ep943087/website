import styled from "styled-components";
import GithubSVG from "../utils/svg/GithubSVG";
import LinkedInSVG from "../utils/svg/LinkedInSVG";
import Typography from "../utils/Typography";

const SVGContainer = styled.div`
  width: 50px;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 655px) {
    width: 100px;
  }
`;

const SVG = (props: {svg: () => JSX.Element, link: string}) => (
  <a href={props.link} target="_blank" rel="noreferrer">
    <SVGContainer>
      <props.svg />
    </SVGContainer>
  </a>
);

function Footer() {
  return (
    <div className="footer">
      <SVG svg={LinkedInSVG} link="https://www.linkedin.com/in/eliasproctor/" />
      <div style={{ margin: 'var(--container-padding) 0' }}>
        <Typography variant="body" isBold>
          &copy; {new Date().getFullYear()} Elias Proctor
        </Typography>
      </div>
      <SVG svg={GithubSVG} link="https://github.com/ep943087" />
    </div>
  );
}

export default Footer;