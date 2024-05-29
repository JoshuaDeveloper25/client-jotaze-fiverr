import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AppContext from "../../../../context/AppProvider";
import NumbersIcon from "@mui/icons-material/Numbers";
import InfoIcon from "@mui/icons-material/Info";
import EditFormUser from "./EditFormUser";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { formatoFecha } from "../../../../utils/dateUtilities";

const ServicesListUserTable = ({ services = [], setFiltering, filtering }) => {
  const queryClient = useQueryClient();

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
          id: "col5",
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
          id: "col6",
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
          id: "col7",
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
          id: "col8",
          cell: (info) => {
            const value = info?.cell?.row?.original;

            const receiveServiceMutation = useMutation({
              mutationFn: async () =>
                await axios.patch(
                  `${import.meta.env.VITE_BASE_URL}/services/recibir-service/${
                    value._id
                  }`
                ),
              onSuccess: (data) => {
                toast.success("¡Recibido exitosamente!");
                queryClient.invalidateQueries({
                  queryKey: ["allServicesUser"],
                });
              },
              onError: (err) => {
                toast.error(getError(err));
              },
            });

            const attendedServiceMutation = useMutation({
              mutationFn: async (serviceInfo) =>
                await axios.patch(
                  `${import.meta.env.VITE_BASE_URL}/services/atendido-service/${
                    value._id
                  }`,
                  serviceInfo
                ),
              onSuccess: (data) => {
                toast.success("¡Atendido exitosamente!");
                queryClient.invalidateQueries({
                  queryKey: ["allServicesUser"],
                });
              },
              onError: (err) => {
                toast.error(getError(err));
              },
            });

            const regretServiceMutation = useMutation({
              mutationFn: async (serviceInfo) =>
                await axios.patch(
                  `${import.meta.env.VITE_BASE_URL}/services/rechazar-service/${
                    value._id
                  }`,
                  serviceInfo
                ),
              onSuccess: (data) => {
                toast.success("¡Rechazado exitosamente!");
                queryClient.invalidateQueries({
                  queryKey: ["allServicesUser"],
                });
              },
              onError: (err) => {
                toast.error(getError(err));
              },
            });

            const handleReceiveService = () => {
              const user_request = confirm(
                "¿Enserio deseas realizar esta acción?"
              );

              if (!user_request) return;

              receiveServiceMutation?.mutate();
            };

            const handleAttendedService = () => {
              const user_request = confirm(
                "¿Enserio deseas realizar esta acción?"
              );

              if (!user_request) return;

              attendedServiceMutation?.mutate({
                estado: "atendido",
                fechaHoraFin: formatoFecha(new Date()),
              });
            };

            const handleRegretService = () => {
              const user_request = confirm(
                "¿Enserio deseas realizar esta acción?"
              );

              if (!user_request) return;

              regretServiceMutation?.mutate();
            };

            if (value?.estado === "atendido" || value?.estado === "rechazado")
              return;

            return (
              <>
                {value?.estado !== "pendiente" ? (
                  <Button
                    onClick={handleReceiveService}
                    variant="contained"
                    size="small"
                    color="warning"
                    disabled={
                      receiveServiceMutation?.isPending ||
                      attendedServiceMutation?.isPending ||
                      regretServiceMutation?.isPending
                    }
                  >
                    Recibir
                  </Button>
                ) : null}

                {value?.estado === "pendiente" ||
                value?.estado === "derivado" ||
                value?.estado === "recibido" ||
                value?.estado === "atendido" ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      sx={{ margin: "0 .4rem" }}
                      LinkComponent={Link}
                      to={`/admin/derivar-usuario/${value?._id}?tipoServicio=${value?.tipoServicio}&servicio=${value?.servicio}`}
                      disabled={
                        receiveServiceMutation?.isPending ||
                        attendedServiceMutation?.isPending ||
                        regretServiceMutation?.isPending
                      }
                    >
                      Derivar
                    </Button>

                    <Button
                      onClick={handleRegretService}
                      variant="contained"
                      size="small"
                      color="error"
                      disabled={
                        receiveServiceMutation?.isPending ||
                        attendedServiceMutation?.isPending ||
                        regretServiceMutation?.isPending
                      }
                    >
                      Rechazar
                    </Button>

                    <Button
                      onClick={handleAttendedService}
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ margin: "0 .4rem" }}
                      disabled={
                        receiveServiceMutation?.isPending ||
                        attendedServiceMutation?.isPending ||
                        regretServiceMutation?.isPending
                      }
                    >
                      Atendido
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
      ]}
    />
  );
};

export default ServicesListUserTable;

// Detalle Modal
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
        modalWidth={400}
        modalText={value?.detalle}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
