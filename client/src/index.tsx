import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
//23123911620-knp8k3lj9lfu336lrod3e0777mtdoo5k.apps.googleusercontent.com

// prod 23123911620-qpdcpgj8349m4jj0gjrd9voa29tin9u7.apps.googleusercontent.com
const devEnv = process.env.NODE_ENV !== "production"
const clientId = devEnv ? "23123911620-knp8k3lj9lfu336lrod3e0777mtdoo5k.apps.googleusercontent.com" : "23123911620-qpdcpgj8349m4jj0gjrd9voa29tin9u7.apps.googleusercontent.com"
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <App />
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
