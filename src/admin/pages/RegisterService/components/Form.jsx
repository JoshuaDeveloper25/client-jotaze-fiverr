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

const Form = ({
  handleSubmit,
  setService,
  service,
  setClassService,
  classService,
  isPending,
}) => {
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
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

      <Box>
        <Box sx={{ flex: "1" }}>
          <TextField
            label="DETALLE"
            sx={{ width: "100%" }}
            focused
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
