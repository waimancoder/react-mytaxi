import axios from "axios";

// Define action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// Define action creators
export function loginSuccess(token, expiry) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      expiry,
    },
  };
}

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://35.73.85.13/api/login", {
      email,
      password,
    });
    const { token, expiry } = response.data;
    dispatch(loginSuccess(token, expiry));
    return response.data;
  } catch (error) {
    console.log(error.response.status);
    throw error;
  }
};
