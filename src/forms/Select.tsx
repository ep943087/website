import styled from "styled-components";
import Typography from "../utils/Typography";

const SelectContainer = styled.select`
  padding: var(--input-padding);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Select = (props: SelectProps) => {
  return (
    <Container>
      <Typography variant="body">{props.label}</Typography>
      <SelectContainer onChange={(e) => props.onChange(e.target.value)}>
        {props.options.map(option => (
          <option key={option.value} value={option.value} selected={option.value === props.value}>{option.label}</option>
        ))}
      </SelectContainer>
    </Container>
  );
};

interface SelectProps {
  value: string,
  label: string,
  options: OptionType[];  
  onChange: (value: string) => void,
};

export interface OptionType {
  value: string,
  label: string,
};

export default Select;