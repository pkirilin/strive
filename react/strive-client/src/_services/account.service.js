import { config } from "../_helpers";

export const accountService = {
  register
};

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(user)
    }
  };
  return fetch(`${config.apiUrl}/account/register`, requestOptions);
}
