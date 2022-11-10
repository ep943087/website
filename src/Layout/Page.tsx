import { useEffect } from 'react';
import './Page.css';

const Page = (props: PageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const style: React.CSSProperties = {
    ...(() => (
      props.flexColumn ? {
        display: 'flex',
        flexDirection: 'column',
      } : {}
    ))()
  };
  return (
    <div className={`page swipeLeft`} style={style}>
      {props.children}
    </div>
  );
};

interface PageProps {
  children: React.ReactNode,
  flexColumn?: boolean,
}

Page.defaultProps = {
  flexColumn: false,
}

export default Page;