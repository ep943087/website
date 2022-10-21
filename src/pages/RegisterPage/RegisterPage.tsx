import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../forms/Form";
import TextField from "../../forms/TextField";
import Page from "../../Layout/Page";
import { convertErrorResponseToArray, post } from "../../Requests/Requests";
import Typography from "../../utils/Typography";

interface RegisterState {
  Email: string,
  Password: string,
};

interface RegisterResponse {
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerValues, setRegisterValues] = useState<RegisterState>({
    Email: '',
    Password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    setIsLoading(true);
    post<RegisterResponse, RegisterState>('/accounts/create', registerValues)
      .then((response) => {
        navigate('/login');
      })
      .catch(error => {
        const errors = convertErrorResponseToArray(error);
        setErrors(errors);
      });
    setIsLoading(false);
  };

  const handleFieldChange = (name: string, value: string) => {
    setRegisterValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Page>
      <Typography variant="title">Register</Typography>
      <Form errors={errors} onSubmit={handleSubmit} submitButtonLabel="Register" isLoading={isLoading}>
        <TextField
          label="Email"
          value={registerValues.Email}
          onChange={handleFieldChange}
          name="Email"
          type="email"
        />
        <TextField
          label="Password"
          value={registerValues.Password}
          name="Password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form>
    </Page>
  );
};

export default RegisterPage;