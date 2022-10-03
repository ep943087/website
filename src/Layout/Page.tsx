import { useEffect } from 'react';
import './Page.css';

const Page = (props: PageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`page swipeLeft`}>
      {props.children}
    </div>
  );
};

interface PageProps {
  children: React.ReactNode,
}

export default Page;