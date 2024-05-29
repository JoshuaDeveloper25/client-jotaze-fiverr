import { useNavigate, useParams } from "react-router-dom";
import Form from "./components/Form";
import { Box, Container, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const ReferUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (data) =>
      await axios
        .patch(
          `${import.meta.env.VITE_BASE_URL}/services/derivar-service/${id}`,
          data
        )
        .then((res) => res.data),
    onSuccess: () => {
      toast.success(`¡Derivado exitosamente!`);
      queryClient.invalidateQueries(["allServicesClient"]);
      // navigate('/admin/');
      navigate("/admin/lista-servicios-usuario");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const dataSend = {
      tipoServicio: dataForm.get("tipoServicio"),
      servicio: dataForm.get("servicio"),
      fechaHoraAccion: dataForm.get("fechaHoraAccion"),
      encargado: dataForm.get("encargado"),
    };

    editMutation.mutate(dataSend);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100svh",
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
          Derivar Usuario
        </Typography>

        {/* Formulario */}
        <Form handleSubmit={handleSubmit} isPending={editMutation.isPending} />
      </Container>
    </Box>
  );
};

export default ReferUser;
