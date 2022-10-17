import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import HeaderLink from "../utils/HeaderLink";
import GlobalContext from "../context/Global/GlobalContext";
import './TopNavigation.css';

function TopNavigation(props: TopNavigationProps) {

  const { showSidebar, setShowSidebar } = props;
  const { getClaim, isLoggedIn } = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [location, setShowSidebar]);

  const handleNavLinkButtonClicked = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="topNavigation">
      <div className="home-link__email">
        <HeaderLink linkURL="/" label="Home" />
        <div>
          {isLoggedIn() && `Hello, ${getClaim('email')?.value}`}
        </div>
      </div>
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
  onClick?: () => void,
}

export default TopNavigation;