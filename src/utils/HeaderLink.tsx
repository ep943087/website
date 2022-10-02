import { NavLink } from "react-router-dom";
import './HeaderLink.css';

const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <div className="header-link">
      <NavLink to={props.linkURL} onClick={props.onClick} style={({ isActive }) => isActive ? {} : {}}>
        {props.label}
      </NavLink>
    </div>
  );
};

interface HeaderLinkProps {
  linkURL: string,
  label: string,
  onClick?: () => void,
}

export default HeaderLink;