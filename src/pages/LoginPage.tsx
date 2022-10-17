import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getClaims, saveToken } from "../auth/handleJWT";
import Form from "../forms/Form";
import TextField from "../forms/TextField";
import Page from "../Layout/Page";
import { convertErrorResponseToArray, post } from "../Requests/Requests";
import Typography from "../utils/Typography";
import GlobalContext from '../context/Global/GlobalContext';

interface LoginState {
  Email: string,
  Password: string,
};

export interface LoginResponse {
  expiration: string,
  token: string,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setClaims } = useContext(GlobalContext);
  const [LoginValues, setLoginValues] = useState<LoginState>({
    Email: '',
    Password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    setIsLoading(true);
    post<LoginResponse, LoginState>('/accounts/login', LoginValues)
      .then((response) => {
        saveToken(response.data);
        setClaims(getClaims());
        navigate('/');
      })
      .catch(error => {
        const errors = convertErrorResponseToArray(error);
        setErrors(errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFieldChange = (name: string, value: string) => {
    setLoginValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Page>
      <Typography variant="title">Login</Typography>
      <Form errors={errors} onSubmit={handleSubmit} submitButtonLabel="Login" isLoading={isLoading}>
        <TextField
          label="Email"
          value={LoginValues.Email}
          onChange={handleFieldChange}
          name="Email"
          type="email"
        />
        <TextField
          label="Password"
          value={LoginValues.Password}
          name="Password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form>
    </Page>
  );
};

export default LoginPage;