import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../../utils/getError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const NewUser = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register-user`,
        userInfo
      ),
    onSuccess: (res) => {
      toast.success(`¡Nuevo Usuario Creado!`);
      navigate("/admin/lista-usuarios");
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      // personType: personType,
      dni: e?.target?.dni?.value?.trim(),
      // ruc: e?.target?.ruc?.value?.trim(),
      firstName: e?.target?.firstName?.value?.trim(),
      lastName: e?.target?.lastName?.value?.trim(),
      email: e?.target?.email?.value?.trim(),
      phoneNumber: e?.target?.phoneNumber?.value?.trim(),
      password: e?.target?.password?.value?.trim(),
      repeatPassword: e?.target?.repeatPassword?.value?.trim(),
      // nameReason: e?.target?.nameReason?.value?.trim(),
      birthday: e?.target?.birthday?.value?.trim(),
    };

    // --> Form validation
    if (
      [
        userInfo?.dni,
        userInfo?.firstName,
        userInfo?.lastName,
        userInfo?.email,
        userInfo?.phoneNumber,
        userInfo?.password,
        userInfo?.birthday,
      ].includes("")
    ) {
      return toast.error("¡Llena los espacios disponibles!");
    } else if (userInfo.password !== userInfo.repeatPassword) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    mutate({
      dni: userInfo?.dni,
      nombres: userInfo?.firstName,
      apellidos: userInfo?.lastName,
      fechaNacimiento: userInfo?.birthday,
      email: userInfo?.email,
      numeroCelular: userInfo?.phoneNumber,
      password: userInfo?.password,
    });
  };

  return (
    <Box
      component="section"
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
        <Form isPending={isPending} handleSubmit={handleSubmit} />
      </Container>
    </Box>
  );
};

export default NewUser;
