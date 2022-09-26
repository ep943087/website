import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderLink from "../utils/HeaderLink";
import './TopNavigation.css';

function TopNavigation(props: TopNavigationProps) {

  const { showSidebar, setShowSidebar } = props;
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [location, setShowSidebar]);

  const handleNavLinkButtonClicked = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="topNavigation">
      <HeaderLink linkURL="/" label="Home" />
      <div className={`navLinkButton${showSidebar ? ' navLinkButton__clicked' : ''}`} onClick={handleNavLinkButtonClicked}>
        <div className="navLinkButton__bar" />
        <div className="navLinkButton__bar" />
        <div className="navLinkButton__bar" />
      </div>
      <div className="topNavLinks">
        {props.topNavLinks.map(link => (
          <HeaderLink key={link.link} linkURL={link.link} label={link.label} />
        ))}
      </div>
    </div>
  );
};

interface TopNavigationProps {
  showSidebar: boolean,
  setShowSidebar: (showSidebar: boolean) => void,
  topNavLinks: TopNavigationLink[],
}

export interface TopNavigationLink {
  link: string,
  label: string,
}

export default TopNavigation;