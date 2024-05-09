import { Box, Button, Link, TextField, Typography } from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";

const Form = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "27rem",
          margin: "0 auto",
          height: "100vh",
          gap: "1rem",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h4" component="h1">
          Log In
        </Typography>

        <TextField
          id="filled-basic"
          type="text"
          label="Email Adress"
          variant="filled"
        />

        <TextField
          id="filled-basic"
          type="password"
          label="Password"
          variant="filled"
        />

        <Link
          component="button"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          ¿Olvidaste la contraseña?
        </Link>

        <Button variant="contained">Login</Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".4rem",
            marginTop: "5rem",
          }}
          component="div"
        >
          <Button variant="outlined">
            <PeopleOutlineRoundedIcon /> Registrarse
          </Button>
          <Button variant="outlined">
            <SearchIcon />
            Buscar Servicio
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Form;
