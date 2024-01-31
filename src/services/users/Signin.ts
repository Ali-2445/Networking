import { prefixUrl } from "../instance";

export const signin = async (email: string, password: string) => {
  const response = await fetch(
    `${prefixUrl}user/authuser/loginUser/?ip=213.197.107.181`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  ).then((res) => res.json());
  console.log(response);
  return response;
};

export const TwoFactor = async (id: string, code: string) => {
  const response = await fetch(`${prefixUrl}user/authuser/Logintwofactor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      code: code,
    }),
  }).then((res) => res.json());
  console.log(response);
  return response;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${prefixUrl}user/authuser/refreshTokenUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  }).then((res) => res.json());
  console.log(response);
  return response;
};
