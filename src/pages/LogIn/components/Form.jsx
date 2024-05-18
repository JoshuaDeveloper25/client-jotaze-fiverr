import { Box, Button, Link, TextField, Typography } from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../images/logo1.webp";

const Form = ({ handleSubmit, isPending }) => {
  return (
    <>
      <Box
        component="section"
        sx={{
          maxWidth: "27rem",
          margin: "0rem auto",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <Box
              sx={{
                height: "8rem",
                width: "8rem",
                borderRadius: "100%",
                background: "#020f1f",
                display: "flex",
                justifyContent: " center",
                alignItems: "center",
                margin: "1rem auto auto auto",
              }}
              component="div"
            >
              <Box
                component="img"
                sx={{
                  width: "4rem",
                }}
                src={logo}
              ></Box>
            </Box>
          </div>

          <Typography
            sx={{ textAlign: "center", margin: "1rem 0" }}
            variant="h4"
            component="h1"
          >
            Log In
          </Typography>
          <TextField
            type="text"
            label="Email Adress"
            variant="filled"
            name="email"
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            name="password"
          />
          <Link
            component={RouterLink}
            to={"#"}
            sx={{ textAlign: "center", margin: ".7rem 0" }}
          >
            ¿Olvidaste la contraseña?
          </Link>
          <Button disabled={isPending} type="submit" variant="contained">
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".4rem",
              marginTop: "5rem",
            }}
            component="div"
          >
            <Button
              component={RouterLink}
              to={`/nuevo-cliente`}
              variant="outlined"
            >
              <PeopleOutlineRoundedIcon /> Registrarse
            </Button>
            <Button
              component={RouterLink}
              to={`/buscar-servicio`}
              variant="outlined"
              sx={{ marginBottom: ".8rem" }}
            >
              <SearchIcon />
              Buscar Servicio
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Form;
