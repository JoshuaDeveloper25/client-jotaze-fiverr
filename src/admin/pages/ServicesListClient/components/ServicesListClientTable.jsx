import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AppContext from "../../../../context/AppProvider";
import NumbersIcon from "@mui/icons-material/Numbers";
import InfoIcon from "@mui/icons-material/Info";
import EditFormClient from "./EditFormClient";
import { useContext, useEffect, useState } from "react";

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
          cell: (info) => <ModalComponentEdit info={info.cell.row.original} />,
        },
      ]}
    />
  );
};

export default ServicesListTable;

// Editar Servicio Modal
const ModalComponentEdit = ({ info }) => {
  const [classService, setClassService] = useState("");
  const [service, setService] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const value = info;

  const [infoRow, setInfoRow] = useState(null);
  const queryClient = useQueryClient();

  const editServiceMutation = useMutation({
    mutationFn: async (data) =>
      await axios
        .put(`/news/edit-new/${infoRow._id}`, data)
        .then((res) => res.data),
    onSuccess: () => {
      setInfoRow(null);
      setTextInfo([]);
      toast.success(`New Edited Successfully!`);
      queryClient.invalidateQueries(["news"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setService(info?.servicio);
    setClassService(info?.tipoServicio);

    setInfoRow(value);
    console.log(info)
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {value?.estado === "atendido" || value?.estado === "rechazado" ? null : (
        <>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            color="warning"
          >
            Editar
          </Button>
        </>
      )}

      <ModalComponent
        modalTitle={"Editar Servicio:"}
        handleClose={handleClose}
        modalWidth={500}
        open={open}
      >
        {/* Formulario */}
        <EditFormClient
          onClose={() => setInfoRow([])}
          infoRow={infoRow}
          setService={setService}
          service={service}
          setClassService={setClassService}
          classService={classService}
        />
      </ModalComponent>
    </>
  );
};

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
        modalText={value?.detalle}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
