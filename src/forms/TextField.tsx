import React, { FormEvent } from "react";

type TextFieldTypes = "text" | "password" | "email";

const TextField = (props: TextFieldProps) => {

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.name, e.currentTarget.value);
  };

  return (
    <div className="textField">
      <label>{props.label}</label>
      <input required={props.required} type={props.type} name={props.name} onChange={handleChange} value={props.value} />
    </div>
  );
};

interface TextFieldProps {
  label: string,
  value: string,
  onChange: (name: string, value: string) => void,
  name: string,
  type: TextFieldTypes,
  required: boolean,
};

TextField.defaultProps = {
  type: "text",
  required: true,
};

export default TextField;