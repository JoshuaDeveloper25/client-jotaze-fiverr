import FollowTheSignsOutlinedIcon from "@mui/icons-material/FollowTheSignsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const Form = () => {
  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "40rem",
        margin: "auto",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField label={`DNI Ó RUC`} sx={{ width: "100%" }} focused />
        </Box>

        <Button variant="contained" component="label">
          <FollowTheSignsOutlinedIcon
            sx={{ marginRight: ".4rem" }}
            fontSize="small"
          />{" "}
          BUSCAR CLIENTE
        </Button>
      </Box>

      <Box
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: ".2rem",
          padding: "1rem",
        }}
        component={"article"}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            gap: "1rem",
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
              Nombre ó Razón Social:
            </Typography>
            <Typography variant={"subtitle2"}>Juan Perez Garcia</Typography>
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
              Dni/Ruc:
            </Typography>
            <Typography variant={"subtitle2"}>45869593</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: " 1rem",
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
              Correo:
            </Typography>
            <Typography variant={"subtitle2"}>jperezg@gmail.com</Typography>
          </Box>
        </Box>
      </Box>

      <FormControl focused fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          CLASE DE SERVICIO
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="CLASE DE SERVICIO"
        >
          <MenuItem value={"Contable"}>Contable</MenuItem>
          <MenuItem value={"Juridico"}>Jurídico</MenuItem>
          <MenuItem value={"Transporte"}>Transporte</MenuItem>
        </Select>
      </FormControl>

      <FormControl focused fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          SERVICIO
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="SERVICIO"
        >
          <MenuItem value={"servicio1"}>Cambio de Regimén Tributario</MenuItem>
          <MenuItem value={"servicio2"}>
            Elaboración de Estados Financieros
          </MenuItem>
          <MenuItem value={"servicio3"}>Reporte Ficha Ruc</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            label="DETALLE"
            sx={{ width: "100%" }}
            multiline
            focused
            rows={4}
            maxRows={4}
          />
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".4rem",
            marginBottom: ".5rem",
          }}
          variant="body2"
        >
          <LibraryBooksOutlinedIcon />
          DOCUMENTOS ADJUNTOS (.JPG) (.PDF) (.DOCX)
        </Typography>
        <Button variant="contained" component="label">
          <AttachFileIcon fontSize="small" /> SELECCIONAR ARCHIVO
          <input type="file" hidden />
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button variant="contained" sx={{ width: "100%" }}>
          <ExitToAppIcon fontSize="small" /> SOLICITAR
        </Button>

        <Button
          to={"/admin/"}
          component={Link}
          variant="outlined"
          color="error"
          sx={{ width: "100%" }}
        >
          <ArrowBackIcon fontSize="small" />
          SALIR
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
