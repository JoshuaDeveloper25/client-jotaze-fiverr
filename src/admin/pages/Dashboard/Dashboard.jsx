import { Box, Container, Typography, Link } from "@mui/material";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppProvider";
import { toast } from "react-toastify";
import { useContext } from "react";
import Metrics from "./Metrics";

const Dashboard = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
    setUserInfo({});
    localStorage.removeItem("userInfo");
    toast.success("¡Cerrado sesión exitosamente!");
  };

  return (
    <>
      <Box sx={{ marginTop: ".5rem" }} component="article">
        <Container maxWidth={"lg"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <Box>
              <Typography variant="h4">Dashboard</Typography>
              <Typography color={`#525659`} variant="h7">
                Dashboard
              </Typography>
            </Box>

            <Box>
              <Link
                component={LinkRouter}
                onClick={handleLogOut}
                underline="always"
                color={"error"}
              >
                SALIR
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              margin: "0",
            }}
            spacing={2}
          >
            <Box
              sx={{
                background: "#0D6EFD",
                borderRadius: ".3rem",
                textAlign: "center",
                padding: "1.5rem 0",
                flex: "20%",
              }}
              color={"#fff"}
            >
              <Typography variant="h7">Pendientes</Typography>

              <Typography
                sx={{ marginTop: ".5rem", fontWeight: "bold" }}
                variant="subtitle2"
              >
                20
              </Typography>
            </Box>

            <Box
              sx={{
                background: "#FEC107",
                borderRadius: ".3rem",
                textAlign: "center",
                padding: "1.5rem 0",
                flex: "20%",
              }}
              color={"#fff"}
            >
              <Typography variant="h7">Recibidos</Typography>

              <Typography
                sx={{ marginTop: ".5rem", fontWeight: "bold" }}
                variant="subtitle2"
              >
                3
              </Typography>
            </Box>

            <Box
              sx={{
                background: "#0DCAF0",
                borderRadius: ".3rem",
                textAlign: "center",
                padding: "1.5rem 0",
                flex: "20%",
              }}
              color={"#fff"}
            >
              <Typography variant="h7">Derivados</Typography>

              <Typography
                sx={{ marginTop: ".5rem", fontWeight: "bold" }}
                variant="subtitle2"
              >
                186
              </Typography>
            </Box>

            <Box
              sx={{
                background: "#188754",
                borderRadius: ".3rem",
                textAlign: "center",
                padding: "1.5rem 0",
                flex: "20%",
              }}
              color={"#fff"}
            >
              <Typography variant="h7">Atendidos</Typography>

              <Typography
                sx={{ marginTop: ".5rem", fontWeight: "bold" }}
                variant="subtitle2"
              >
                162
              </Typography>
            </Box>

            <Box
              sx={{
                background: "#DC3546",
                borderRadius: ".3rem",
                textAlign: "center",
                padding: "1.5rem 0",
                flex: "24% 0",
              }}
              color={"#fff"}
            >
              <Typography variant="h7">Rechazados</Typography>

              <Typography
                sx={{ marginTop: ".5rem", fontWeight: "bold" }}
                variant="subtitle2"
              >
                5
              </Typography>
            </Box>
          </Box>

          <Metrics userInfo={userInfo} />
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
