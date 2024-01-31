import { instance } from "../instance";

export const signin = async (email: string, password: string) => {
  const response = await instance
    .post(`user/authuser/loginUser/?ip=213.197.107.181`, {
      json: {
        email: email,
        password: password,
      },
    })
    .json();
  console.log(response);
  return response;
};

export const TwoFactor = async (id: string, code: string) => {
  const response = await instance
    .post(`user/authuser/Logintwofactor`, {
      json: {
        id: id,
        code: code,
      },
    })
    .json();
  console.log(response);
  return response;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await instance
    .post(`user/authuser/refreshTokenUser`, {
      json: {
        refreshToken,
      },
    })
    .json();
  console.log(response);
  return response;
};
