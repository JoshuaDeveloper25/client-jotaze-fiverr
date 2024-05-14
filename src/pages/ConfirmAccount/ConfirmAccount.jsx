import { useQuery } from "@tanstack/react-query";
import { Link as LinkRouter, useParams } from "react-router-dom";
import axios from "axios";

import logo from "../../images/logo1.webp";
import { Box, Container, Typography, Link } from "@mui/material";

const ConfirmAccount = () => {
  const params = useParams();

  const { isPending, error } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/confirm/${params?.token}`
      ),
  });

  return (
    <Container maxWidth={"lg"}>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: ".4rem",
            padding: "2rem 4rem",
          }}
        >
          <div>
            <Box
              sx={{
                height: "12rem",
                width: "12rem",
                borderRadius: "100%",
                background: "#020f1f",
                display: "flex",
                justifyContent: " center",
                alignItems: "center",
                margin: "0 auto 1.5rem auto",
              }}
              component="div"
            >
              <Box
                component="img"
                sx={{
                  width: "6rem",
                }}
                src={logo}
              ></Box>
            </Box>
          </div>
          {isPending ? (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "2rem",
                  margin: "1rem 0",
                  fontWeight: "medium",
                }}
              >
                Tu cuenta se está verificando...
              </Typography>

              <Typography variant="h6">
                ¡Nos preocupamos por tu seguridad!
              </Typography>
            </>
          ) : error ? (
            <>
              <Typography
                variant="h4"
                sx={{
                  marginTop: "1rem",
                  fontWeight: "medium",
                }}
              >
                Token Inválido
              </Typography>

              <Typography
                sx={{
                  margin: "1rem 0",
                }}
                variant="h6"
              >
                ¡Nos preocupamos por tu seguridad!
              </Typography>

              <div>
                <Link
                  component={LinkRouter}
                  sx={{ fontSize: "1rem" }}
                  to={`/nuevo-cliente`}
                >
                  Nuevo Cliente
                </Link>
              </div>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "medium",
                }}
              >
                ¡Tu cuenta ha sido verificada!
              </Typography>

              <Typography
                sx={{
                  margin: "1rem 0",
                }}
                variant="h6"
              >
                ¡Nos preocupamos por tu seguridad!
              </Typography>

              <div>
                <Link component={LinkRouter} sx={{ fontSize: "1rem" }} to={`/`}>
                  Log In
                </Link>
              </div>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmAccount;
