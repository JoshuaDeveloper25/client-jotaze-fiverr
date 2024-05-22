import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const EditUserForm = ({ handleSubmit, isPending, open, setOpen, infoRow }) => {
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
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
            name="dni"
            defaultValue={infoRow?.dni}
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="number"
            label="NÚMERO CELULAR"
            focused
            size="small"
            name="phoneNumber"
            defaultValue={infoRow?.numeroCelular}
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
            name="firstName"
            defaultValue={infoRow?.nombres}
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            label="APELLIDOS"
            focused
            size="small"
            name="lastName"
            defaultValue={infoRow?.apellidos}
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
            name="birthday"
            defaultValue={infoRow?.fechaNacimiento}
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            sx={{ width: "100%" }}
            type="email"
            label="CORREO ELECTRÓNICO"
            focused
            size="small"
            name="email"
            disabled
            defaultValue={infoRow?.email}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button
          disabled={isPending}
          type="submit"
          variant="contained"
          sx={{ width: "100%" }}
        >
          <ExitToAppIcon fontSize="small" /> Editar
        </Button>

        <Button
          onClick={() => setOpen(!open)}
          component={Link}
          variant="outlined"
          color="error"
          sx={{ width: "100%" }}
        >
          <ArrowBackIcon fontSize="small" />
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

export default EditUserForm;
