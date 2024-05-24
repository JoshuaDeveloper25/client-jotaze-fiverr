import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const Form = ({
  handleSubmit,
  addMoreServicesType,
  isPending,
  tiposServicios,
  setTiposServicios,
  info,
}) => {
  const tipoServiciosChange = (e, idx) => {
    setTiposServicios((prev) =>
      prev?.map((item, id) =>
        id === idx ? { descripcion: e?.target?.value } : item
      )
    );
  };

  const deleteTypeService = (idx) => {
    if (tiposServicios?.length === 1) {
      return toast.warning("¡Es obligatorio al menos un tipo!");
    }

    setTiposServicios((prev) => prev.filter((tipoServicio, id) => +idx !== id));
  };

  return (
    <Box
      component={"section"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "30rem",
        margin: "auto",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box sx={{ flex: "1" }}>
            <TextField
              label="CLASE DE SERVICIO"
              sx={{ width: "100%" }}
              name="clasesServicios"
              size="small"
              focused
              variant="filled"
              defaultValue={info?.claseServicio}
            />
          </Box>
        </Box>

        {tiposServicios?.map((tipoServicio, idx) => {
          return (
            <Box key={idx}>
              <Box sx={{ display: "flex", alignItems: "center", flex: "1" }}>
                <TextField
                  label={idx === 0 && "TIPOS DE SERVICIOS"}
                  sx={{ width: "100%" }}
                  name="tiposServicios"
                  size="small"
                  focused
                  variant="filled"
                  value={tiposServicios[idx].descripcion || ""}
                  onChange={(e) => tipoServiciosChange(e, idx)}
                />
                <Button onClick={() => deleteTypeService(idx)} color="error">
                  <CloseIcon />
                </Button>
              </Box>
            </Box>
          );
        })}

        <Box>
          <Button
            type="button"
            onClick={addMoreServicesType}
            disabled={isPending}
            variant="outlined"
            sx={{ width: "100%", marginBottom: ".5rem" }}
          >
            <ExitToAppIcon fontSize="small" /> Agregar Más
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            sx={{ width: "100%" }}
          >
            <ExitToAppIcon fontSize="small" />{" "}
            {info?._id ? "Editar" : "Registrar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
