import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { PageRouter } from "./router";
import authContext from "./authContext";

if (window.location.pathname === "/") {
  window.location.assign("/v1/login");
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated, authToken, setAuthToken }}>
      <PageRouter />
    </authContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
