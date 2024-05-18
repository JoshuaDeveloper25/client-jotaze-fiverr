import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AdminRoot = () => {
  return (
    <Box sx={{ display: "flex", gap: "1.5rem" }} component="section">
      <Box sx={{ flex: "1" }}>
        <Sidebar />
      </Box>

      <Box sx={{ flex: "70%", overflowY: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminRoot;
