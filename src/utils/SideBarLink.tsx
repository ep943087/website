import { useEffect, useState } from "react";

const SideBarLink = (props: SideBarLinkProps) => {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (!props.reference?.current) {
        return;
      }

      var rect = props.reference.current.getBoundingClientRect();

      setInView(
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
      );
    }
    window.addEventListener('scroll', scrollHandler);
    scrollHandler();
    return (
      () => {
        window.removeEventListener('scroll', scrollHandler);
      }
    );
  }, [props.reference]);

  const className = `sideBarLink ${inView ? 'inViewLink' : ''}`;

  return (
    <div className={className} onClick={() => props.reference?.current?.scrollIntoView()}>
      {props.label}
    </div>
  );
};

export interface SideBarLinkProps {
  reference: React.RefObject<HTMLDivElement>,
  label: string,
}

export default SideBarLink;