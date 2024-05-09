import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link as MuiLink } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{ height: "100vh", flex: "1", background: "#101827" }}
      component="nav"
    >
      <MuiLink
        to="/"
        underline="none"
        component={RouterLink}
        color={"#fff"}
        sx={{ display: "flex", alignItems: "end", gap: ".2rem", padding: '.6rem' }}
      >
        <HouseOutlinedIcon /> Inicio
      </MuiLink>

    </Box>
  );
};

export default Sidebar;
