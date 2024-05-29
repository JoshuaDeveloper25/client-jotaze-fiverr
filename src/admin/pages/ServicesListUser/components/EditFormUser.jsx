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
import SelectServices from "../../../../components/SelectServices";

const EditFormUser = ({
  handleSubmit,
  setService,
  service,
  setClassService,
  classService,
  isPending,
  open,
  setOpen,
  infoRow,
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
      <SelectServices
        classService={classService}
        setClassService={setClassService}
        nameInputClass="tipoServicio"
        nameInputType={"servicio"}
        setTypeService={setService}
        typeService={service}
      />

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: "1" }}>
          <TextField
            label="DETALLE"
            sx={{ width: "100%" }}
            variant="filled"
            multiline={true}
            rows={3}
            name="detalle"
            defaultValue={infoRow?.detalle}
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
          disabled={isPending}
        >
          <ArrowBackIcon fontSize="small" />
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

export default EditFormUser;
