import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  authToken: "",
  setAuthenticated: (auth: any) => {},
  setAuthToken: (token: any) => {},
});

export default authContext;
