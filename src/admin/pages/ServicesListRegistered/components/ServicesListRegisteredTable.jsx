import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../utils/getError";
import Form from "../../AddService/components/Form";
import { useNavigate } from "react-router-dom";

const ServicesListRegisteredTable = ({
  services = [],
  setFiltering,
  filtering,
}) => {
  return (
    <Table
      data={services}
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
                  Clase de Servicio
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
                  fontSize: ".9rem",
                }}
              >
                {value?.claseServicio}
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
                  Tipo de Servicio
                </Typography>
              </Box>
            );
          },
          cell: (info) => {
            const servicesType = info?.cell?.row?.original?.tipoServicio;

            return (
              <Box component="ul">
                {servicesType?.map((serviceType, idx) => (
                  <Box key={idx} component="li">
                    {serviceType?.descripcion}
                  </Box>
                ))}
              </Box>
            );
          },
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
          cell: (info) => {
            const queryClient = useQueryClient();
            const cellId = info?.cell?.row?.original?._id;

            const deleteServiceMutation = useMutation({
              mutationFn: async (id) =>
                await axios.delete(
                  `${import.meta.env.VITE_BASE_URL}/class-service/delete/${id}`
                ),
              onSuccess: (data) => {
                toast.success("¡Servicio eliminado exitosamente!");
                queryClient?.invalidateQueries(["allServicesListRegistered"]);
              },
              onError: (err) => {
                toast.error(getError(err));
                console.log(err);
              },
            });

            const handleDeleteService = (id) => {
              const user_request = confirm(
                "¿Estás seguro de que deseas eliminarlo?"
              );

              if (!user_request) {
                return;
              }

              deleteServiceMutation?.mutate(id);
            };

            return (
              <>
                <ModalComponentEdit
                  isPending={deleteServiceMutation?.isPending}
                  info={info?.cell?.row?.original}
                />
                <Button
                  onClick={() => handleDeleteService(cellId)}
                  color="error"
                  variant="contained"
                  size="small"
                  disabled={deleteServiceMutation?.isPending}
                >
                  Eliminar
                </Button>
              </>
            );
          },
        },
      ]}
    />
  );
};

export default ServicesListRegisteredTable;

// Editar Servicio Modal
const ModalComponentEdit = ({ info, isPending }) => {
  const [open, setOpen] = useState(false);
  const [tiposServicios, setTiposServicios] = useState(
    info?.tipoServicio || [{}]
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addServiceMutation = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/class-service/update/${info?._id}`,
        serviceInfo
      ),
    onSuccess: (data) => {
      toast.success("¡Servicio editado exitosamente!");
      queryClient.invalidateQueries(["allServicesListRegistered"]);
      setOpen(false);
      console.log(data);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const addMoreServicesType = () => {
    const nuevoTipoServicio = {};

    setTiposServicios([...tiposServicios, nuevoTipoServicio]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceInfo = {
      claseServicio: e?.target?.clasesServicios?.value?.trim(),
      tipoServicio: tiposServicios,
    };

    const inputValidationType = tiposServicios?.find(
      (tipoServicio) => "descripcion" in tipoServicio
    );

    if (!inputValidationType || !serviceInfo?.claseServicio) {
      return toast.error("¡Llena los campos disponibles!");
    }

    addServiceMutation?.mutate(serviceInfo);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="small"
        color="warning"
        disabled={isPending}
      >
        Editar
      </Button>
      <ModalComponent
        modalTitle={"Editar Servicio:"}
        handleClose={handleClose}
        modalWidth={500}
        open={open}
      >
        {/* Formulario */}
        <Form
          isPending={addServiceMutation?.isPending}
          tiposServicios={tiposServicios}
          handleSubmit={handleSubmit}
          addMoreServicesType={addMoreServicesType}
          setTiposServicios={setTiposServicios}
          info={info}
        />
      </ModalComponent>{" "}
    </>
  );
};
