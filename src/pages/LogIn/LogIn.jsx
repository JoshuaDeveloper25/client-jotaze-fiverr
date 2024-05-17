import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { getError } from "../../utils/getError";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useContext } from "react";
import axios from "axios";

const LogIn = () => {
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      ),
    onSuccess: (res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toast.success("¡Accedido exitosamente!");
      setUserInfo(res.data);
      console.log(res);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.data?.token}`;

      if (res.data.role === "client") navigate("/admin/registrar-servicio");
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
      password: e?.target.password?.value.trim(),
    };

    if ([userInfo?.email, userInfo?.password].includes("")) {
      return toast.error("¡Llena los espacios disponibles!");
    }

    mutate({
      email: userInfo?.email,
      password: userInfo?.password,
    });
  };

  return (
    <Container maxWidth={"lg"}>
      <Form handleSubmit={handleSubmit} />
    </Container>
  );
};

export default LogIn;
