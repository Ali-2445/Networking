import ky from "ky";

export const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ""}`;

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: "application/json",
  },
});
