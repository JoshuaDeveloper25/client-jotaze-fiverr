import { getRandomNumberUnique } from "../../../utils/getRandomNumberUnique";
import { formatoFecha } from "../../../utils/dateUtilities";
import AppContext from "../../../context/AppProvider";
import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const RegisterService = () => {
  const { userInfo } = useContext(AppContext);
  const [classService, setClassService] = useState("");
  const [service, setService] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (serviceInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/services/register-service-client`,
        serviceInfo
      ),
    onSuccess: (res) => {
      toast.success(`¡Nuevo Servicio Creado!`);
      console.log(res);

      if (userInfo?.role === "admin") {
        navigate("/admin/lista-servicios");
      } else {
        navigate("/admin/lista-servicios-cliente");
      }
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
    } else if (e?.target?.uploadImages?.value === "") {
      return toast.error("¡Subir un archivo es necesario!");
    }

    const formData = new FormData(e.target);
    formData.append("fechaHoraAccion", formatoFecha(new Date()));
    formData.append("numeroServicio", getRandomNumberUnique(10));
    formData.append("codigo", getRandomNumberUnique(4));

    mutate(formData);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
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
