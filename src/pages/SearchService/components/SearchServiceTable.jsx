import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NumbersIcon from "@mui/icons-material/Numbers";
import { Table } from "../../../components/Table";
import RoomIcon from "@mui/icons-material/Room";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Typography } from "@mui/material";


const SearchServiceTable = ({ track = [], setFiltering, filtering }) => {
  return (
    <Table
      data={track}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "col1",
          accessorKey: "numeroSolicitud",
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
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Adjunto
              </Typography>
            </Box>
          ),
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
