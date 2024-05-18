import { getRandomNumberUnique } from "../../../utils/getRandomNumberUnique";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatoFecha } from "../../../utils/dateUtilities";
import { Box, Container, Typography } from "@mui/material";
import { getError } from "../../../utils/getError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const ClientXService = () => {
  const [classService, setClassService] = useState("");
  const [service, setService] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const searchClientMutation = useMutation({
    mutationFn: async (client) =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-client/${client?.client}`
      ),
    onSuccess: (data) => {
      toast.success('¡Cliente encontrado!')
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });


  console.log(searchClientMutation?.data?.data?._id)
  const { mutate, isPending } = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/services/register-service-admin-user/${
          searchClientMutation?.data?.data?._id
        }`,
        serviceInfo
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["allServices"]);
      toast.success(`¡Exitosamente solicitado!`);
      navigate("/admin/lista-servicios");
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([service, classService, e?.target?.detalle?.value].includes("")) {
      return toast.error("¡Llena los campos disponibles!");
    } 
    // else if (e?.target?.uploadImages?.value === '') {
    //   return toast.error('¡Subir un archivo es necesario!')
    // }

    const formData = new FormData(e.target);
    formData.append("fechaHoraAccion", formatoFecha(new Date()));
    formData.append("numeroServicio", getRandomNumberUnique(10));
    formData.append("codigo", getRandomNumberUnique(4));

    mutate(formData);
  };

  console.log(searchClientMutation?.data?.data)

  const handleSearchClient = (e) => {
    e.preventDefault();

    if ([e?.target?.dniRuc?.value].includes("")) {
      return toast.error("¡Busca un cliente primero!");
    }

    searchClientMutation?.mutate({ client: e?.target?.dniRuc?.value });
  };

  return (
    <Box
      component="section"
      pt={{ md: 16, lg: 5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: `${
              searchClientMutation?.data?.data ? "10rem" : "1.4rem"
            }`,
            marginBottom: "1rem",
          }}
          variant="h4"
        >
          Servicios
        </Typography>

        {/* Formulario */}
        <Form
          searchedClient={searchClientMutation?.data?.data}
          handleSearchClient={handleSearchClient}
          isPending={isPending}
          handleSubmit={handleSubmit}
          setService={setService}
          service={service}
          setClassService={setClassService}
          classService={classService}
        />
      </Container>
    </Box>
  );
};

export default ClientXService;
