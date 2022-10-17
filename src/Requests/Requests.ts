import axios from "axios";

const BASE_URL = "https://eliasproctor.com";

export const post = async <Type, BodyType>(url: string, body: BodyType) => {
  return axios.post<Type>(BASE_URL + '/api' + url, body);
};

export const get = async <Type>(url: string) => {
  return axios.get<Type>(url);
}

export const convertErrorResponseToArray = (error: {response: { data: any[] | string } }): string[] => {
  const { data } = error.response;
  return typeof data === 'string' ? [data] :
    data.map((message: { description: string }) => message.description)
};