import { useState, useContext } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import Footer from "./Footer";
import TopNavigation, { TopNavigationLink } from "./TopNavigation";
import TopNavigationSidebar from "./TopNavigationSidebar";
import './Layout.css';
import GlobalContext from "../context/Global/GlobalContext";

const topNavLinks: TopNavigationLink[] = [
  { link: '/projects', label: 'Projects' },
];


const Layout = (props: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const { transparentMain } = useContext(GlobalContext);

  const mainStyle: React.CSSProperties = {
    opacity: transparentMain ? '.9' : '1',
  };

  return (
    <div className="body">
      <TopNavigation
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        topNavLinks={topNavLinks}
      />
      <TopNavigationSidebar
        showSidebar={showSidebar}
        topNavLinks={topNavLinks}
      />
      {transparentMain && <BackgroundCanvas />}
      <div className="main" style={mainStyle}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

interface LayoutProps {
  children: React.ReactNode,
}