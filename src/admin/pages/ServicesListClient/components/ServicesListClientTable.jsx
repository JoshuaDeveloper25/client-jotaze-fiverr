import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NumbersIcon from "@mui/icons-material/Numbers";
import { Link as RouterLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

const ServicesListTable = ({ services = [], setFiltering, filtering }) => {
  return (
    <Table
      data={services}
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
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Número de Servicio
              </Typography>
            </Box>
          ),
        },

        {
          id: "col2",
          accessorKey: "codigo",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <FormatListNumberedIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Código
              </Typography>
            </Box>
          ),
        },

        {
          id: "col3",
          accessorKey: "tipoServicio",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <AppRegistrationIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Tipo Servicio
              </Typography>
            </Box>
          ),
        },

        {
          id: "col4",
          accessorKey: "",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                <AccessibilityIcon />

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Cliente
                </Typography>
              </Box>
            );
          },
          cell: (info) => {
            const value = info.cell.row.original;

            return (
              <>
                <p>
                  {value?.clienteInfo?.nombres ||
                    value?.clienteInfo?.nombreRazonSocial}
                </p>
              </>
            );
          },
        },

        {
          id: "col5",
          accessorKey: "detalle",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <InfoIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Detalle
              </Typography>
            </Box>
          ),
          cell: (info) => <CellCustom info={info} />,
        },

        {
          id: "col6",
          accessorKey: "",
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
          id: "col7",
          accessorKey: "fechaHoraAccion",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <AccessTimeIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Fecha-Hora
              </Typography>
            </Box>
          ),
        },

        {
          id: "col8",
          accessorKey: "estado",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <TroubleshootIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Estado
              </Typography>
            </Box>
          ),
        },

        {
          id: "col9",
          cell: (info) => {
            const value = info?.cell?.row?.original;

            return (
              <>
                {value?.estado === "pendiente" ? (
                  <>
                    <Button variant="contained" size="small" color="warning">
                      Recibir
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      sx={{ margin: "0 .4rem" }}
                    >
                      Derivar
                    </Button>

                    <Button variant="contained" size="small" color="error">
                      Rechazar
                    </Button>
                  </>
                ) : null}
              </>
            );
          },
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                <ManageAccountsIcon />

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Acciones
                </Typography>
              </Box>
            );
          },
        },

        {
          id: "col10",
          accessorKey: "observacion",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <VisibilityIcon />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }} 
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

export default ServicesListTable;

const CellCustom = ({ info }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const value = info.cell.row.original;

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="small"
        color="success"
      >
        <VisibilityIcon sx={{ marginRight: ".4rem" }} />
        Ver
      </Button>

      <ModalComponent
        modalTitle={"Detalle:"}
        modalText={value?.detalle}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
