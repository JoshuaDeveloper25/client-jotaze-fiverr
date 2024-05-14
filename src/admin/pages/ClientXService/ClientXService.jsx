import { Box, Container, Typography } from "@mui/material";
import Form from "./components/Form";

const ClientXService = () => {
  return (
    <Box component="section">
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "1.4rem",
            marginBottom: "1rem"
          }}
          variant="h4"
        >
          Servicios
        </Typography>

        {/* Formulario */}
        <Form />
      </Container>
    </Box>
  );
};

export default ClientXService;
