import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../../utils/getError";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const AddService = () => {
  const [tiposServicios, setTiposServicios] = useState([{}]);
  const navigate = useNavigate();

  const addServiceMutation = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/class-service/create`,
        serviceInfo
      ),
    onSuccess: (data) => {
      toast.success("¡Servicio creado exitosamente!");
      navigate("/admin/lista-servicios-registrados");
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

  return (
    <Box component="section" sx={{ marginBlock: "3rem" }}>
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
          variant="h4"
        >
          Registrando Servicio
        </Typography>

        {/* Formulario */}
        <Form
          isPending={addServiceMutation?.isPending}
          tiposServicios={tiposServicios}
          handleSubmit={handleSubmit}
          addMoreServicesType={addMoreServicesType}
          setTiposServicios={setTiposServicios}
        />
      </Container>
    </Box>
  );
};

export default AddService;
