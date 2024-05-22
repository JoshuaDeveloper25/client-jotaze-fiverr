import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EditUserForm from "./EditUserForm";
import { toast } from "react-toastify";
import axios from "axios";

const UsersListTable = ({ users = [], setFiltering, filtering }) => {
  return (
    <Table
      data={users}
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
            console.log(value);
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
                  DNI
                </Typography>
              </Box>
            );
          },
          cell: (info) => info?.cell?.row?.original?.dni,
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
          cell: (info) => (
            <Typography variant="subtitle2" sx={{ textTransform: "initial" }}>
              {info?.cell?.row?.original?.nombres}
            </Typography>
          ),
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

export default UsersListTable;

// Editar Usuario Modal
const ModalComponentEdit = ({ info }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const editUserMutation = useMutation({
    mutationFn: async (data) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/edit-user/${info._id}`,
        data
      ),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["allUsers"]);
      toast.success("¡Usuario Editado Exitosamente!");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      dni: e?.target?.dni?.value?.trim(),
      nombres: e?.target?.firstName?.value?.trim(),
      apellidos: e?.target?.lastName?.value?.trim(),
      fechaNacimiento: e?.target?.birthday?.value?.trim(),
      numeroCelular: e?.target?.phoneNumber?.value?.trim(),
      email: e?.target?.email?.value?.trim(),
    };

    if (
      [
        userInfo?.dni,
        userInfo?.nombres,
        userInfo?.apellidos,
        userInfo?.fechaNacimiento,
        userInfo?.numeroCelular,
        userInfo?.email,
      ].includes("")
    ) {
      return toast.error("¡Llena los campos disponibles!");
    }

    editUserMutation?.mutate({
      dni: userInfo?.dni,
      nombres: userInfo?.nombres,
      apellidos: userInfo?.apellidos,
      fechaNacimiento: userInfo?.fechaNacimiento,
      numeroCelular: userInfo?.numeroCelular,
      email: userInfo?.email,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
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
        modalTitle={"Editar Usuario:"}
        modalWidth={500}
        handleClose={handleClose}
        open={open}
      >
        {/* Formulario */}
        <EditUserForm
          handleSubmit={handleSubmit}
          infoRow={info}
          isPending={editUserMutation?.isPending}
        />
      </ModalComponent>
    </>
  );
};
