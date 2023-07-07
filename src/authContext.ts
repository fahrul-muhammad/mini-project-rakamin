import { createContext } from "react";

const token = localStorage.getItem("token");

const authContext = createContext({
  authenticated: false,
  authToken: "",
  setAuthenticated: (auth: any) => {},
  setAuthToken: (token: any) => {},
});

export default authContext;
