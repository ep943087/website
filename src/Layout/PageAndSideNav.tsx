import { useEffect } from 'react';
import SideBarLink, { SideBarLinkProps } from '../utils/SideBarLink';
import './PageAndSideNav.css';

const PageAndSideNav = (props: PageAndSideNavProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pageAndSideNav">
      <div className="pageAndSideNav__sidebar swipeLeft">
        {props.sidebarLinks.map(link => (
          <SideBarLink {...link} />
        ))}
      </div>
      <div className="pageAndSideNav__page swipeLeft">
        {props.children}
      </div>
    </div>
  );
};

interface PageAndSideNavProps {
  children: React.ReactNode,
  sidebarLinks: SideBarLinkProps[],
}

export default PageAndSideNav;