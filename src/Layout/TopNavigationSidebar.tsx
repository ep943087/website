import { Link } from 'react-router-dom';
import { TopNavigationLink } from './TopNavigation';


const TopNavigationSidebar = (props: TopNavigationSidebarProps) => {
  const showClassName = props.showSidebar ? ' topNavigationSidebar__show' : '';
  return (
    <div className={`topNavigationSidebar${showClassName}`}>
      {props.topNavLinks.map(link => (
        <Link key={link.link} to={link.link}>{link.label}</Link>
      ))}
    </div>
  );
};

interface TopNavigationSidebarProps {
  showSidebar: boolean,
  topNavLinks: TopNavigationLink[],
}

export default TopNavigationSidebar;