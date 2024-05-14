import { getRandomNumberUnique } from "../../../utils/getRandomNumberUnique";
import { formatoFecha } from "../../../utils/dateUtilities";
import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const RegisterService = () => {
  const [classService, setClassService] = useState("");
  const [service, setService] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/services/register-service-client`,
        serviceInfo
      ),
    onSuccess: (res) => {
      toast.success(`¡Nuevo Servicio Creado!`);
      console.log(res);
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

    // const serviceInfo = {
    //   tipoServicio: formData.get("classService"),
    //   detalle: e?.target?.detalle?.value,
    //   uploadImages: formData.get("uploadImages"),
    //   numeroServicio: getRandomNumberUnique(10),
    //   codigo: getRandomNumberUnique(4),
    // };

    // if ([serviceInfo?.tipoServicio, serviceInfo?.detalle].includes("")) {
    //   return toast.error("¡Llena los espacios disponibles!");
    // }

    // console.log(serviceInfo);

    mutate(formData);
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
          Registro de Servicio
        </Typography>

        {/* Formulario */}
        <Form
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

export default RegisterService;
