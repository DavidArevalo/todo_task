import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { RoutesPath } from "./service/config";
import "./App.scss";
import BoardsPage from "./pages/BoardPage/BoardPage";
import HomePage from "./pages/HomePage/HomePage";
import { StylesProvider } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import UnauthenticatedUserToolbar from "./components/Toolbar/UnauthenticatedUserToolbar";
import LoginContainer from "./pages/Authentication/Login";
import RegisterContainer from "./pages/Authentication/Register";

function App() {
  const isAuthenticated = true;
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          {isAuthenticated ? <Toolbar /> : <UnauthenticatedUserToolbar />}
          <Routes>
            <Route path={`${RoutesPath.boards}`} element={<BoardsPage />} />
            <Route path={`${RoutesPath.join}`} element={<HomePage />} />
            <Route path={`${RoutesPath.login}`} element={<LoginContainer />} />
            <Route path={`${RoutesPath.register}`} element={<RegisterContainer />} />
            <Route path="/*" element={<BoardsPage />} />
          </Routes>
        </Router>
      </StylesProvider>
    </div>
  );
}

export default App;
