import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Box sx={{ height: "100svh", flex: "70%", marginTop: ".5rem" }} component="article">
        <Container maxWidth={"xl"}>
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
              <Link href="#" underline="always">
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
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
