import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";

const AdminRoot = () => {
  return (
    <Box sx={{ display: "flex", gap: "1.5rem" }} component="section">
      <Sidebar />

      <Dashboard />
    </Box>
  );
};

export default AdminRoot;
