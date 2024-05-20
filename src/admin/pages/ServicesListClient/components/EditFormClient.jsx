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

const EditFormClient = ({
  handleSubmit,
  setService,
  service,
  setClassService,
  classService,
  isPending,
  open,
  setOpen,
}) => {
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
      <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label">CLASE DE SERVICIO</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="CLASE DE SERVICIO"
          value={classService}
          onChange={(e) => setClassService(e.target.value)}
          name="tipoServicio"
          defaultValue={""}
        >
          <MenuItem value={"Contable"}>Contable</MenuItem>
          <MenuItem value={"Juridico"}>Jurídico</MenuItem>
          <MenuItem value={"Transporte"}>Transporte</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" variant="filled" fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          SERVICIO
        </InputLabel>

        {classService === "Contable" ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={""}
          >
            <MenuItem value={"contable1"}>
              Cambio de Regimén Tributario
            </MenuItem>
            <MenuItem value={"contable2"}>
              Elaboración de Estados Financieros
            </MenuItem>
            <MenuItem value={"contable3"}>Reporte Ficha Ruc</MenuItem>
          </Select>
        ) : classService === "Juridico" ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={""}
          >
            <MenuItem value={"juridico1"}>
              Elaboración Minuta Compra-Venta
            </MenuItem>
            <MenuItem value={"juridico2"}>Aumento de Capital Social</MenuItem>
            <MenuItem value={"juridico3"}>
              Registro Propiedad Vehicular
            </MenuItem>
          </Select>
        ) : classService === "Transporte" ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={""}
          >
            <MenuItem value={"transporte1"}>
              Obtención Permiso Transporte Turism
            </MenuItem>
            <MenuItem value={"transporte2"}>
              Certificado de Bonificación
            </MenuItem>
            <MenuItem value={"transporte3"}>Cambio de Motor</MenuItem>
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={""}
          >
            <MenuItem value={"contable1"}>
              Cambio de Regimén Tributario
            </MenuItem>
            <MenuItem value={"contable2"}>
              Elaboración de Estados Financieros
            </MenuItem>
            <MenuItem value={"contable3"}>Reporte Ficha Ruc</MenuItem>
          </Select>
        )}
      </FormControl>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            label="DETALLE"
            sx={{ width: "100%" }}
            variant="filled"
            multiline={true}
            rows={3}
            name="detalle"
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
          <input accept=".jpg, .pdf" name="uploadImages" type="file" hidden />
        </Button>
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

export default EditFormClient;
