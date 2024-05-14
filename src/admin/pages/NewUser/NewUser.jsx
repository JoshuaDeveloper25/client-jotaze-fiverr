import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../../utils/getError";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const NewUser = () => {
  const { mutate } = useMutation({
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
        clientInfo?.dni,
        clientInfo?.firstName,
        clientInfo?.lastName,
        clientInfo?.email,
        clientInfo?.phoneNumber,
        clientInfo?.password,
        clientInfo?.birthday,
      ].includes("")
    ) {
      return toast.error("¡Llena los espacios disponibles!");
    } else if (clientInfo.password !== clientInfo.repeatPassword) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    mutate({
      dni: clientInfo?.dni,
      nombres: clientInfo?.firstName,
      apellidos: clientInfo?.lastName,
      fechaNacimiento: clientInfo?.birthday,
      email: clientInfo?.email,
      numeroCelular: clientInfo?.phoneNumber,
      password: clientInfo?.password,
    });
  };

  return (
    <Box component="section">
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "1.4rem",
          }}
          variant="h4"
        >
          Nuevo Usuario
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "1.6rem",
            color: "#85909d",
          }}
          variant="body2"
        >
          Llena el siguiente formulario para crear un usuario.
        </Typography>

        {/* Formulario */}
        <Form />
      </Container>
    </Box>
  );
};

export default NewUser;
