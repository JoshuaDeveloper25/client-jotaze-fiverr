import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ServicesListTable from "./components/ServicesListTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ServicesList = () => {
  const [filtering, setFiltering] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["allServices"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/services/get-all-services`
      ),
  });

  return (
    <Box component="section">
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "1.4rem",
            marginBottom: "2rem",
          }}
          variant="h4"
        >
          Lista De Servicios
        </Typography>

        <Box sx={{ marginBottom: "2.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "end", gap: "1rem" }}>
            <FormControl sx={{ flex: "1" }} focused fullWidth>
              <InputLabel focused id="demo-simple-select-label">
                ESTADO
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="ESTADO"
              >
                <MenuItem value={"Pendiente"}>Pendientes</MenuItem>
                <MenuItem value={"Recibidos"}>Recibidos</MenuItem>
                <MenuItem value={"Derivados"}>Derivados</MenuItem>
                <MenuItem value={"Rechazados"}>Rechazados</MenuItem>
                <MenuItem value={"Atendidos"}>Atendidos</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flex: "1" }}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  marginBottom: ".4rem",
                }}
                variant="body2"
              >
                Buscar por número de servicio:
              </Typography>
              <TextField
                id="filled-basic"
                type="text"
                label="Buscar..."
                variant="filled"
                name="text"
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>

          <Button variant="contained" sx={{ marginTop: "1rem" }}>
            <SearchOutlinedIcon fontSize="small" /> Buscar
          </Button>
        </Box>

        <ServicesListTable
          services={data?.data}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default ServicesList;
