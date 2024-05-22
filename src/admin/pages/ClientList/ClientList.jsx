import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import ClientListTable from "./components/ClientListTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ClientList = () => {
  const { data, isPending, error, isFetched } = useQuery({
    queryKey: ["allClients"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-all-clients`
      ),
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
          Lista De Clientes
        </Typography>

        <ClientListTable
          clients={data?.data}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default ClientList;
