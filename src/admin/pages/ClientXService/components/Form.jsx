import FollowTheSignsOutlinedIcon from "@mui/icons-material/FollowTheSignsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppContext from "../../../../context/AppProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const Form = ({
  searchedClient,
  handleSearchClient,
  handleSubmit,
  setService,
  service,
  setClassService,
  classService,
  isPending,
}) => {
  const { userInfo } = useContext(AppContext);

  return (
    <>
      {userInfo?.role === "client" ? null : (
        <Box
          component="form"
          onSubmit={handleSearchClient}
          sx={{
            display: "flex",
            gap: "1rem",
            maxWidth: "30rem",
            margin: "0 auto 1rem auto",
          }}
        >
          <Box sx={{ flex: "1" }}>
            <TextField
              label={`DNI Ó RUC`}
              sx={{ width: "100%" }}
              type="text"
              name="dniRuc"
              focused
            />
          </Box>

          <Button variant="contained" type="submit">
            <FollowTheSignsOutlinedIcon
              sx={{ marginRight: ".4rem" }}
              fontSize="small"
            />{" "}
            BUSCAR CLIENTE
          </Button>
        </Box>
      )}

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
        {searchedClient ? (
          <Box
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              borderRadius: ".2rem",
              padding: "1rem",
            }}
            component={"article"}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                gap: "1rem",
              }}
            >
              <Box>
                <Typography
                  variant={"subtitle1"}
                  sx={{
                    fontWeight: "bold",
                    lineHeight: ".6",
                    textTransform: "uppercase",
                  }}
                >
                  Nombre ó Razón Social:
                </Typography>
                <Typography variant={"subtitle2"}>
                  {searchedClient?.nombreRazonSocial
                    ? `${searchedClient?.nombreRazonSocial || ""}`
                    : `${searchedClient?.nombres || ""}` +
                      " " +
                      `${searchedClient?.apellidos || " "}`}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant={"subtitle1"}
                  sx={{
                    fontWeight: "bold",
                    lineHeight: ".6",
                    textTransform: "uppercase",
                  }}
                >
                  Dni/Ruc:
                </Typography>
                <Typography variant={"subtitle2"}>
                  {searchedClient?.dni
                    ? `${searchedClient?.dni || ""}`
                    : `${searchedClient?.numeroRuc || ""}`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: " 1rem",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography
                  variant={"subtitle1"}
                  sx={{
                    fontWeight: "bold",
                    lineHeight: ".6",
                    textTransform: "uppercase",
                  }}
                >
                  Celular:
                </Typography>
                <Typography variant={"subtitle2"}>
                  {searchedClient?.numeroCelular}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant={"subtitle1"}
                  sx={{
                    fontWeight: "bold",
                    lineHeight: ".6",
                    textTransform: "uppercase",
                  }}
                >
                  Correo:
                </Typography>
                <Typography variant={"subtitle2"}>
                  {searchedClient?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : null}

        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <FormControl focused fullWidth>
            <InputLabel focused id="demo-simple-select-label">
              CLASE DE SERVICIO
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="CLASE DE SERVICIO"
              value={classService}
              onChange={(e) => setClassService(e.target.value)}
              name="tipoServicio"
              defaultValue={""}
            >
              <MenuItem value={"Contable"}>Contable</MenuItem>
              <MenuItem value={"Juridico"}>Jurídico</MenuItem>
              <MenuItem value={"Transporte"}>Transporte</MenuItem>
            </Select>
          </FormControl>

          <FormControl focused fullWidth>
            <InputLabel focused id="demo-simple-select-label">
              SERVICIO
            </InputLabel>

            {classService === "Contable" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="SERVICIO"
                name="servicio"
                disabled={!classService}
                value={service}
                onChange={(e) => setService(e.target.value)}
                defaultValue={""}
              >
                <MenuItem value={"contable1"}>
                  Cambio de Regimén Tributario
                </MenuItem>
                <MenuItem value={"contable2"}>
                  Elaboración de Estados Financieros
                </MenuItem>
                <MenuItem value={"contable3"}>Reporte Ficha Ruc</MenuItem>
              </Select>
            ) : classService === "Juridico" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="SERVICIO"
                name="servicio"
                disabled={!classService}
                value={service}
                onChange={(e) => setService(e.target.value)}
                defaultValue={""}
              >
                <MenuItem value={"juridico1"}>
                  Elaboración Minuta Compra-Venta
                </MenuItem>
                <MenuItem value={"juridico2"}>
                  Aumento de Capital Social
                </MenuItem>
                <MenuItem value={"juridico3"}>
                  Registro Propiedad Vehicular
                </MenuItem>
              </Select>
            ) : classService === "Transporte" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="SERVICIO"
                name="servicio"
                disabled={!classService}
                value={service}
                onChange={(e) => setService(e.target.value)}
                defaultValue={""}
              >
                <MenuItem value={"transporte1"}>
                  Obtención Permiso Transporte Turism
                </MenuItem>
                <MenuItem value={"transporte2"}>
                  Certificado de Bonificación
                </MenuItem>
                <MenuItem value={"transporte3"}>Cambio de Motor</MenuItem>
              </Select>
            ) : (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="SERVICIO"
                name="servicio"
                disabled={!classService}
                value={service}
                onChange={(e) => setService(e.target.value)}
                defaultValue={""}
              >
                <MenuItem value={"contable1"}>
                  Cambio de Regimén Tributario
                </MenuItem>
                <MenuItem value={"contable2"}>
                  Elaboración de Estados Financieros
                </MenuItem>
                <MenuItem value={"contable3"}>Reporte Ficha Ruc</MenuItem>
              </Select>
            )}
          </FormControl>

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ flex: "1" }}>
              <TextField
                label="DETALLE"
                sx={{ width: "100%" }}
                focused
                multiline={true}
                rows={3}
                name="detalle"
              />
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                marginBottom: ".5rem",
              }}
              variant="body2"
            >
              <LibraryBooksOutlinedIcon />
              DOCUMENTOS ADJUNTOS (.JPG) (.PDF) (.DOCX)
            </Typography>
            <Button variant="contained" component="label">
              <AttachFileIcon fontSize="small" /> SELECCIONAR ARCHIVO
              <input
                accept=".jpg, .pdf"
                name="uploadImages"
                type="file"
                hidden
              />
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              sx={{ width: "100%" }}
            >
              <ExitToAppIcon fontSize="small" /> SOLICITAR
            </Button>

            <Button
              to={"/admin/"}
              component={Link}
              variant="outlined"
              color="error"
              sx={{ width: "100%" }}
            >
              <ArrowBackIcon fontSize="small" />
              SALIR
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Form;
