import PropTypes from "prop-types";
import { alpha, Box } from "@mui/material";
import MainCard from "../../components/Cards/MainCard";

const AuthCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
    shadow={`0px 2px 8px ${alpha("#fafafa", 0.15)}`}
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCard.propTypes = {
  children: PropTypes.node,
};

export default AuthCard;
