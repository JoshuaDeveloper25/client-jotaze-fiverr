import { Box, Button, Link, TextField, Typography } from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../images/logo1.webp";

const Form = ({ handleSubmit }) => {
  return (
    <>
      <Box
        component="section"
        sx={{
          maxWidth: "27rem",
          margin: "3rem auto",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
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
                margin: "0 auto",
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

          <Typography sx={{ textAlign: "center" }} variant="h4" component="h1">
            Log In
          </Typography>
          <TextField
            id="filled-basic"
            type="text"
            label="Email Adress"
            variant="filled"
            name="email"
          />
          <TextField
            id="filled-basic"
            type="password"
            label="Password"
            variant="filled"
            name="password"
          />
          <Link
            component="button"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            ¿Olvidaste la contraseña?
          </Link>
          <Button type="submit" variant="contained">
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
