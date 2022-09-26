import { useState } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import Footer from "./Footer";
import TopNavigation, { TopNavigationLink } from "./TopNavigation";
import TopNavigationSidebar from "./TopNavigationSidebar";

const topNavLinks: TopNavigationLink[] = [
  { link: '/about', label: 'About' },
];


const Layout = (props: LayoutProps) => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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
        <div className="main">
          <BackgroundCanvas />
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