import { Link } from "react-router-dom";
import './HeaderLink.css';

const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <div className="header-link">
      <Link to={props.linkURL} onClick={props.onClick}>
        {props.label}
      </Link>
    </div>
  );
};

interface HeaderLinkProps {
  linkURL: string,
  label: string,
  onClick?: () => void,
}

export default HeaderLink;