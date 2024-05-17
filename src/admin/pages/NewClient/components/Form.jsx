import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Form = ({ handleSubmit, personType, handleChange }) => {
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
      <FormControl focused fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          TIPO DE PERSONA
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personType}
          label="TIPO DE PERSONA"
          onChange={handleChange}
          defaultValue={""}

        >
          <MenuItem value={"Natural"}>Natural</MenuItem>
          <MenuItem value={"Juridica"}>Jurídica</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <div
            style={{ display: `${personType === "Natural" ? "flex" : "none"}` }}
          >
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="number"
              label="DNI"
              size="small"
              focused
              name="dni"
            />
          </div>
          <div
            style={{ display: `${personType === "Natural" ? "none" : "flex"}` }}
          >
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="number"
              label="N°RUC"
              size="small"
              focused
              name="ruc"
            />
          </div>
        </Box>

        <Box sx={{ flex: "1" }}>
          <div
            style={{ display: `${personType === "Natural" ? "flex" : "none"}` }}
          >
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="date"
              label="FECHA DE NACIMIENTO"
              size="small"
              focused
              name="birthday"
            />
          </div>
          <div
            style={{ display: `${personType === "Natural" ? "none" : "flex"}` }}
          >
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="text"
              label="NOMBRES O RAZÓN SOCIAL"
              size="small"
              focused
              name="nameReason"
            />
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          display: `${personType === "Natural" ? "flex" : "none"}`,
          gap: `1rem`,
        }}
      >
        <Box sx={{ flex: "1" }}>
          {personType === "Natural" ? (
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="text"
              label="NOMBRES"
              size="small"
              focused
              name="firstName"
            />
          ) : null}
        </Box>

        <Box sx={{ flex: "1" }}>
          {personType === "Natural" ? (
            <TextField
              id="filled-basic"
              sx={{ width: "100%" }}
              type="text"
              label="APELLIDOS"
              size="small"
              focused
              name="lastName"
            />
          ) : null}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            id="filled-basic"
            sx={{ width: "100%" }}
            type="email"
            label="CORREO ELECTRÓNICO"
            size="small"
            focused
            name="email"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            id="filled-basic"
            sx={{ width: "100%" }}
            type="number"
            label="NÚMERO CELULAR"
            size="small"
            focused
            name="phoneNumber"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            id="filled-basic"
            sx={{ width: "100%" }}
            type="password"
            label="CONTRASEÑA"
            size="small"
            focused
            name="password"
          />
        </Box>

        <Box sx={{ flex: "1" }}>
          <TextField
            id="filled-basic"
            sx={{ width: "100%" }}
            type="password"
            label="CONFIRMAR CONTRASEÑA"
            size="small"
            name="repeatPassword"
            focused
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          <ExitToAppIcon fontSize="small" /> REGISTRAR
        </Button>

        <Button
          component={Link}
          to={-1}
          variant="outlined"
          color="error"
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
