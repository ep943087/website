import React from "react";
import './Form.css';
import LoadingButton from "./LoadingButton";

const Form = (props: FormProps) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit();
  };

  const getFormErrors = () => (
    <ul className="error-list">
      {props.errors.map((error) => {
        return <li key={error} className="error">{error}</li>
      })}
    </ul>
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
      {props.errors.length > 0 && getFormErrors()}
      {props.children}
      {props.submitButtonLabel !== undefined && (
        <LoadingButton isLoading={props.isLoading} label={props.submitButtonLabel ?? ''} />
      )}
    </form>
  );
};

interface FormProps {
  onSubmit: () => void,
  children: React.ReactNode,
  errors: string[],
  submitButtonLabel?: string,
  isLoading?: boolean,
}

export default Form;