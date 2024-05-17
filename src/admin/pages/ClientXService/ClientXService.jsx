import { getRandomNumberUnique } from "../../../utils/getRandomNumberUnique";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatoFecha } from "../../../utils/dateUtilities";
import { Box, Container, Typography } from "@mui/material";
import { getError } from "../../../utils/getError";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const ClientXService = () => {
  const [classService, setClassService] = useState("");
  const [service, setService] = useState("");
  const [client, setClient] = useState("");
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["serviceDniRuc"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-client/${client}`
      ),
    enabled: !!client,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/services/register-service-admin-user/${data?.data?._id}`,
        serviceInfo
      ),
    onSuccess: (res) => {
      toast.success(`¡Exitosamente solicitado!`);
      console.log(res);
      queryClient.invalidateQueries(["allServices"]);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("fechaHoraAccion", formatoFecha(new Date()));
    formData.append("numeroServicio", getRandomNumberUnique(10));
    formData.append("codigo", getRandomNumberUnique(4));

    mutate(formData);
  };

  const handleSearchClient = (e) => {
    e.preventDefault();

    setClient(e?.target?.dniRuc?.value);
  };

  return (
    <Box component="section">
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "1.4rem",
            marginBottom: "1rem",
          }}
          variant="h4"
        >
          Servicios
        </Typography>

        {/* Formulario */}
        <Form
          searchedClient={data?.data}
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
