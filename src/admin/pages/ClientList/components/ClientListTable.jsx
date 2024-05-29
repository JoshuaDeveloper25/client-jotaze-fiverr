import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../../context/AppProvider";
import EditClientForm from "./EditClientForm";
import { toast } from "react-toastify";
import axios from "axios";

const UsersListTable = ({ clients = [], setFiltering, filtering }) => {
  return (
    <Table
      data={clients}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "col1",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Email
                </Typography>
              </Box>
            );
          },
          cell: (info) => {
            const value = info?.cell?.row?.original;

            return (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "lowercase",
                  fontSize: ".9rem",
                }}
              >
                {value?.email}
              </Typography>
            );
          },
        },

        {
          id: "col2",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  DNI ó Ruc
                </Typography>
              </Box>
            );
          },
          cell: (info) =>
            info?.cell?.row?.original?.dni ||
            info?.cell?.row?.original?.numeroRuc,
        },

        {
          id: "col3",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Nombres
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.nombres,
        },

        {
          id: "col4",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Apellidos
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.apellidos,
        },

        {
          id: "col5",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Nombre Razón Social
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.nombreRazonSocial,
        },

        {
          id: "col6",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Fecha de Nacimiento
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.fechaNacimiento,
        },

        {
          id: "col7",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  N° Celular
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.numeroCelular,
        },

        {
          id: "col8",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Tipo de Persona
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.tipoPersona,
        },

        {
          id: "col9",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <ManageAccountsIcon /> */}

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
          cell: (info) => (
            <ModalComponentEdit info={info?.cell?.row?.original} />
          ),
        },
      ]}
    />
  );
};

export default UsersListTable;

// Editar Cliente Modal
const ModalComponentEdit = ({ info }) => {
  const { userInfo } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [personType, setPersonType] = useState("");

  const editUserMutation = useMutation({
    mutationFn: async (data) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/edit-client/${info._id}`,
        data
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allClients"]);
      toast.success("Cliente Editado Exitosamente!");
      // setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const clientInfo = {
      personType: personType,
      firstName: e?.target?.firstName?.value?.trim(),
      lastName: e?.target?.lastName?.value?.trim(),
      phoneNumber: e?.target?.phoneNumber?.value?.trim(),
      nameReason: e?.target?.nameReason?.value?.trim(),
      birthday: e?.target?.birthday?.value?.trim(),
      // ruc: e?.target?.ruc?.value?.trim(),
      // dni: e?.target?.dni?.value?.trim(),
      // email: e?.target?.email?.value?.trim(),
      // password: e?.target?.password?.value?.trim(),
      // repeatPassword: e?.target?.repeatPassword?.value?.trim(),
    };

    if (
      [
        personType === "Natural" && clientInfo?.firstName,
        personType === "Natural" && clientInfo?.lastName,
        personType === "Natural" && clientInfo?.birthday,
        personType === "Juridico" && clientInfo?.phoneNumber,
        personType === "Juridico" && clientInfo?.personType,
        personType === "Juridico" && clientInfo?.nameReason,
        // personType === "Natural" && clientInfo?.dni,
        // personType === "Juridico" && clientInfo?.password,
        // personType === "Juridico" && clientInfo?.email,
        // personType === "Juridico" && clientInfo?.ruc,
      ].includes("")
    ) {
      return toast.error("¡Llena los espacios disponibles!");
    }

    let conditionalClientInfo = {};

    if (personType === "Natural") {
      // Natural
      conditionalClientInfo = {
        tipoPersona: clientInfo?.personType,
        nombres: clientInfo?.firstName,
        apellidos: clientInfo?.lastName,
        fechaNacimiento: clientInfo?.birthday,
        numeroCelular: clientInfo?.phoneNumber,
        nombreRazonSocial: "",
        // dni: clientInfo?.dni,
        // email: clientInfo?.email,
        // password: clientInfo?.password,
      };

    } else {
      // Juridica
      conditionalClientInfo = {
        nombreRazonSocial: clientInfo?.nameReason,
        numeroCelular: clientInfo?.phoneNumber,
        tipoPersona: clientInfo?.personType,
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        // numeroRuc: clientInfo?.ruc,
        // password: clientInfo?.password,
        // email: clientInfo?.email,
      };
    }

    editUserMutation?.mutate(conditionalClientInfo);
  };

  useEffect(() => {
    setPersonType(info?.tipoPersona);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {userInfo?.role === "admin" ? (
        <>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            color="warning"
          >
            Editar
          </Button>
          <ModalComponent
            modalTitle={"Editar Cliente:"}
            handleClose={handleClose}
            modalWidth={500}
            open={open}
          >
            {/* Formulario */}
            <EditClientForm
              handleSubmit={handleSubmit}
              infoRow={info}
              personType={personType}
              setPersonType={setPersonType}
              isPending={editUserMutation?.isPending}
            />
          </ModalComponent>{" "}
        </>
      ) : null}
    </>
  );
};
