import React, { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { CreateBoard } from "../../components/Boards/CreateBoard/CreateBoard";
import { RecentBoards } from "../../components/Boards/RecentBoards/RecentBoards";
import LandingImage from "./../../images/background.jpg";
import "./HomePage.css";
import { Grid, Slide, Typography, useMediaQuery, useTheme } from "@mui/material";

const HomePage = () => {
  const [createBoard, setCreateBoard] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <Grid spacing={2}>
        <Grid container item sm={12} spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide direction="down" in={true} timeout={1000}>
              <div className="HomePageContainer">
                <Typography variant="h5">Task Board App</Typography>
                <img
                  alt="React Task board App"
                  style={{ height: "400px", width: "500px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
                  src={LandingImage}
                ></img>
                <Typography variant="subtitle1">
                  Free / Open source React MaterialUI Template - Task Board App. Template comes with most essential
                  things of Typescript, Lint, prettier, React Router, Material-UI and Cool Landing Page to bootstrap
                  your web app. Just clone the Repo and start building your app.
                </Typography>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <div className="HomePageContainer">{createBoard ? <RecentBoards /> : <CreateBoard />}</div>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
