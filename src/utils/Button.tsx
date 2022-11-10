import styled from "styled-components";

const ButtonContainer = styled.button`
  padding: 15px;
  color: white;
  font-size: 1rem;
`;

export interface ButtonProps {
  label: string;
  onClick: () => void,
  color?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonContainer onClick={props.onClick} style={{ backgroundColor: props.color }}>
      {props.label}
    </ButtonContainer>
  );
};

Button.defaultProps = {
  color: 'green',
};

export default Button;