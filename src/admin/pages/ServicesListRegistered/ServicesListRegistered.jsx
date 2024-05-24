import { Box, Container, Typography } from "@mui/material";
import ServicesListRegisteredTable from "./components/ServicesListRegisteredTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ServicesListRegistered = () => {
  const { data, isPending, error, isFetched } = useQuery({
    queryKey: ["allServicesListRegistered"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/class-service/get-all-class-service`),
  });

  const [filtering, setFiltering] = useState("");

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
          Lista De Servicios Registrados
        </Typography>

        <ServicesListRegisteredTable
          services={data?.data}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default ServicesListRegistered;
