import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NumbersIcon from "@mui/icons-material/Numbers";
import { Link as RouterLink } from "react-router-dom";
import { Table } from "../../../components/Table";
import RoomIcon from "@mui/icons-material/Room";
import InfoIcon from "@mui/icons-material/Info";

import { Box, Button, Typography } from "@mui/material";

const SearchServiceTable = ({ track = [], setFiltering, filtering }) => {
  return (
    <Table
      data={track}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "col1",
          accessorKey: "numeroServicio",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <NumbersIcon />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Número de Solicitud
              </Typography>
            </Box>
          ),
        },

        {
          id: "col2",
          accessorKey: "detalle",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <InfoIcon />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Detalle
              </Typography>
            </Box>
          ),
        },

        {
          id: "col3",
          accessorKey: "adjunto",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <AttachFileIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Adjunto
              </Typography>
            </Box>
          ),
          cell: (info) => {
            const value = info?.cell?.row?.original;
            return value?.adjunto?.[0]?.cloudinary_url.includes(".docx") ? (
              <>
                <Button
                  component={RouterLink}
                  sx={{ textDecoration: "transparent", color: "black" }}
                  to={value?.adjunto?.[0]?.cloudinary_url}
                  target="_blank"
                >
                  <Typography variant="body2">Descargar PDF</Typography>
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  sx={{ textDecoration: "transparent", color: "black" }}
                  to={value?.adjunto?.[0]?.cloudinary_url}
                  target="_blank"
                >
                  <Typography variant="body2">Ver Visualización</Typography>
                </Button>
              </>
            );
          },
        },

        {
          id: "col4",
          accessorKey: "usuario",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <AccountCircleIcon />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Usuario
              </Typography>
            </Box>
          ),
          cell: (info) => {
            const value = info.cell.row.original;

            return (
              <>
                <p>{value?.encargado?.nombres}</p>
              </>
            );
          },
        },

        {
          id: "col5",
          accessorKey: "area",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <RoomIcon />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Área
              </Typography>
            </Box>
          ),
        },

        {
          id: "col6",
          accessorKey: "observacion",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <VisibilityIcon />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Obvervación
              </Typography>
            </Box>
          ),
        },
      ]}
    />
  );
};

export default SearchServiceTable;
