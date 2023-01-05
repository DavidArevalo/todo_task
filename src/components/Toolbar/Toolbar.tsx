import React from "react";
import { Typography, Button, Slide, Toolbar as AppToolbar, AppBar, useTheme, useMediaQuery } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import { MergeTypeOutlined, AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Toolbar.css";
import { RoutesPath } from "../../service/config";
export const title = "Task Board";

export const Toolbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Slide direction="down" in={true} timeout={800}>
      <AppBar position="sticky" className="AppBar" color="inherit">
        <AppToolbar>
          <div className="HeaderContainer">
            <div className="HeaderLeftContainer" onClick={() => navigate(RoutesPath.home)}>
              <AssignmentTurnedInIcon color="primary" className="HeaderIcon" />
              <Typography variant={isSmallScreen ? "subtitle1" : "h5"} color="inherit" noWrap>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title="New Board"
                startIcon={<AddCircleOutline />}
                color="primary"
                onClick={() => navigate(`${RoutesPath.home}`)}
              >
                {!isSmallScreen ? "New Board" : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlined />}
                size={isSmallScreen ? "small" : "large"}
                color="primary"
                onClick={() => navigate(RoutesPath.join)}
              >
                {!isSmallScreen ? "Open Board" : null}
              </Button>
              <Button
                id="github-button"
                color="primary"
                onClick={() => (window.location.href = "https://github.com/hellomuthu23/react-material-ui-template")}
              >
                <GithubIcon></GithubIcon>
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
