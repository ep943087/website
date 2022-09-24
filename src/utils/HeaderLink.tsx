import { Link } from "react-router-dom";
import styled from 'styled-components';
import './HeaderLink.css';

const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <div className="header-link">
      <Link to={props.linkURL}>
        {props.label}
      </Link>
    </div>
  );
};

interface HeaderLinkProps {
  linkURL: string,
  label: string,
}

export default HeaderLink;