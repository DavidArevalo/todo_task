import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "easy-peasy";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

reportWebVitals();
