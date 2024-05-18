import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Form = ({ isPending }) => {
  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "30rem",
        margin: "auto",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="number"
            label="DNI"
            focused
            size="small"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="number"
            label="NÚMERO CELULAR"
            focused
            size="small"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            label="NOMBRES"
            focused
            size="small"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            label="APELLIDOS"
            focused
            size="small"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="date"
            label="FECHA DE NACIMIENTO"
            focused
            size="small"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="email"
            label="CORREO ELECTRÓNICO"
            focused
            size="small"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="password"
            label="CONTRASEÑA"
            focused
            size="small"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="password"
            label="CONFIRMAR CONTRASEÑA"
            focused
            size="small"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button disabled={isPending} variant="contained" sx={{ width: "100%" }}>
          <ExitToAppIcon fontSize="small" /> REGISTRAR
        </Button>

        <Button
          component={Link}
          to={"/admin/"}
          color={"error"}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          <ArrowBackIcon fontSize="small" />
          ATRÁS
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
