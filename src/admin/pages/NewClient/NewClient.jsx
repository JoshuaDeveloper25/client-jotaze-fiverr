import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../../utils/getError";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const NewClient = () => {
  const [personType, setPersonType] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register-client`,
        userInfo
      ),
    onSuccess: (res) => {
      toast.success(`¡Nuevo Cliente Creado!`);
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const clientInfo = {
      personType: personType,
      dni: e?.target?.dni?.value?.trim(),
      ruc: e?.target?.ruc?.value?.trim(),
      firstName: e?.target?.firstName?.value?.trim(),
      lastName: e?.target?.lastName?.value?.trim(),
      email: e?.target?.email?.value?.trim(),
      phoneNumber: e?.target?.phoneNumber?.value?.trim(),
      password: e?.target?.password?.value?.trim(),
      repeatPassword: e?.target?.repeatPassword?.value?.trim(),
      nameReason: e?.target?.nameReason?.value?.trim(),
      birthday: e?.target?.birthday?.value?.trim(),
    };

    // --> Form validation
    if (
      [
        personType === "Natural" && clientInfo?.firstName,
        personType === "Natural" && clientInfo?.lastName,
        personType === "Natural" && clientInfo?.birthday,
        personType === "Natural" && clientInfo?.dni,
        personType === "Juridico" && clientInfo?.phoneNumber,
        personType === "Juridico" && clientInfo?.personType,
        personType === "Juridico" && clientInfo?.nameReason,
        personType === "Juridico" && clientInfo?.password,
        personType === "Juridico" && clientInfo?.email,
        personType === "Juridico" && clientInfo?.ruc,
      ].includes("")
    ) {
      return toast.error("¡Llena los espacios disponibles!");
    } else if (clientInfo.password !== clientInfo.repeatPassword) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    let conditionalClientInfo = {};

    if (personType === "Natural") {
      // Natural
      conditionalClientInfo = {
        tipoPersona: clientInfo?.personType,
        dni: clientInfo?.dni,
        nombres: clientInfo?.firstName,
        apellidos: clientInfo?.lastName,
        fechaNacimiento: clientInfo?.birthday,
        email: clientInfo?.email,
        numeroCelular: clientInfo?.phoneNumber,
        password: clientInfo?.password,
      };
    } else {
      // Juridica
      conditionalClientInfo = {
        tipoPersona: clientInfo?.personType,
        numeroRuc: clientInfo?.ruc,
        nombreRazonSocial: clientInfo?.nameReason,
        email: clientInfo?.email,
        numeroCelular: clientInfo?.phoneNumber,
        password: clientInfo?.password,
      };
    }

    mutate({
      tipoPersona: clientInfo?.personType,
      dni: clientInfo?.dni,
      nombres: clientInfo?.firstName,
      apellidos: clientInfo?.lastName,
      fechaNacimiento: clientInfo?.birthday,
      email: clientInfo?.email,
      numeroCelular: clientInfo?.phoneNumber,
      password: clientInfo?.password,
      numeroRuc: clientInfo?.ruc,
      nombreRazonSocial: clientInfo?.nameReason,
    });
  };

  const handleChange = (e) => {
    setPersonType(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      component="section"
    >
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
          variant="h4"
        >
          Nuevo Cliente Persona {personType}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "1.6rem",
            color: "#85909d",
          }}
          variant="body2"
        >
          Llena el siguiente formulario para crear un cliente.
        </Typography>

        {/* Formulario */}
        <Form
          handleSubmit={handleSubmit}
          personType={personType}
          handleChange={handleChange}
          isPending={isPending}
        />
      </Container>
    </Box>
  );
};

export default NewClient;
