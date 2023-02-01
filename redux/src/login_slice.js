import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userService } from "./users_slice";

const loginService = axios.create({
  baseURL: "http://localhost:8080/login",
  headers: {
    "Content-Type": "application/json",
  },
});
// function setJWT(jwt) {
//   loginService.defaults.headers = {
//     ...loginService.defaults.headers,
//     Authorization: `Bearer ${jwt}`,
//   };
// }

export const loginSlice = createSlice({
  name: "login",
  initialState: () => {
    const jwt = sessionStorage.getItem("JWT");
    const stateLogged = jwt !== null;
    if (stateLogged) {
      userService.defaults.headers = {
        ...userService.defaults.headers,
        'Authorization': `Bearer ${jwt}`
      }
    }
    return { jwt: jwt, loggedIn: stateLogged };
  },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      state.loggedIn = true;
      sessionStorage.setItem("JWT", action.payload)
      userService.defaults.headers = {
        ...userService.defaults.headers,
        'Authorization': `Bearer ${action.payload}`
      }
    },
    logout: (state) => {
      state.jwt = null;
      state.loggedIn = false;
      sessionStorage.removeItem("JWT");
      userService.defaults.headers['Authorization'] = undefined
    },
  },
});

export const loginAsync = (credentials, success, fail) => (dispatch) => {
  loginService
    .post("/", undefined, {
      auth: credentials,//
    })
    .then((res) => {
      dispatch(login(res.data.jwt));
      console.log(res.data.jwt);
      success();
    })
    .catch((error) => {
      console.log(error);
      fail(error);
    });
};
const { login } = loginSlice.actions;
export const { logout } = loginSlice.actions;
export const loggedInSelect = (state) => state.login.loggedIn;
export default loginSlice.reducer;
