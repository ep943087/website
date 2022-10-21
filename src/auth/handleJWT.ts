import { LoginResponse } from "../pages/LoginPage/LoginPage";
import { Claim } from "./types";

const tokenKey = 'token';
const expirationKey = 'token-expiration';

export const saveToken = (authData: LoginResponse) => {
  localStorage.setItem(tokenKey, authData.token);
  localStorage.setItem(expirationKey, authData.expiration.toString());
};

export const getClaims = (): Claim[] => {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return [];
  }
  const expiration = localStorage.getItem(expirationKey) as string;
  const expirationDate = new Date(expiration);
  if (expirationDate <= new Date()) {
    return [];
  }

  const dataToken = JSON.parse(atob(token.split('.')[1]));
  const response: Claim[] = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property]});
  }
  return response;
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}