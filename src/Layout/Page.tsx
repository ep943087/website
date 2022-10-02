import './Page.css';

const Page = (props: PageProps) => {
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