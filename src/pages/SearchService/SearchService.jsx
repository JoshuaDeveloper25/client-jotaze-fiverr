import { Box, Container, Typography, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

import SearchServiceTable from "./components/SearchServiceTable";
import { useState } from "react";

const track = [
  {
    numeroSolicitud: 2024.00006,
    detalle: "Ver (0)",
    adjunto: "Ver (0)",
    usuario: "Issac Gómez Day",
    area: "Contable",
    observacion: "En trámite",
  },
];

const SearchService = () => {
  const [filtering, setFiltering] = useState("");

  return (
    <Box component={"section"} sx={{ marginTop: "1rem" }}>
      <Container maxWidth={`lg`}>
        <Box sx={{ textAlign: "end" }}>
          <Link
            component={LinkRouter}
            underline="always"
            color={"error"}
            to={`/`}
          >
            SALIR
          </Link>
        </Box>

        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: ".2rem",
            padding: "1rem",
            marginTop: "1rem",
            background: "#020F1F",
            color: "white",
            maxWidth: "25rem",
            margin: "0 auto",
            transition: "all .4s",
            "&:hover": { transform: "scale(1.1)" },
          }}
          component={"article"}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid #E1E1E1",
              paddingBottom: ".8rem",
              gap: "3rem",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                Tipo:
              </Typography>
              <Typography variant={"subtitle2"}>Contable</Typography>
            </Box>

            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                Estado:
              </Typography>
              <Typography variant={"subtitle2"}>Recibido</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid #E1E1E1",
              paddingBottom: ".8rem",
              gap: "3rem",
              textAlign: "center",
              marginTop: " 1rem",
            }}
          >
            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                Servicio:
              </Typography>
              <Typography variant={"subtitle2"}>REPORTE FICHA RUC</Typography>
            </Box>

            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                CLIENTE:
              </Typography>
              <Typography variant={"subtitle2"}>Juan Peréz García</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid #E1E1E1",
              paddingBottom: ".8rem",
              gap: "3rem",
              textAlign: "center",
              marginTop: " 1rem",
            }}
          >
            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                DNI/RUC:
              </Typography>
              <Typography variant={"subtitle2"}>45869593</Typography>
            </Box>

            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                Fecha y Hora:
              </Typography>
              <Typography variant={"subtitle2"}>15-01-2024 15:36:42</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              textAlign: "center",
              marginTop: " 1rem",
            }}
          >
            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                Celular:
              </Typography>
              <Typography variant={"subtitle2"}>913528963</Typography>
            </Box>

            <Box>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: ".6",
                  textTransform: "uppercase",
                }}
              >
                CORREO:
              </Typography>
              <Typography variant={"subtitle2"}>jperezg@gmail.com</Typography>
            </Box>
          </Box>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          variant="h4"
        >
          Seguimiento
        </Typography>

        <SearchServiceTable
          track={track}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default SearchService;
