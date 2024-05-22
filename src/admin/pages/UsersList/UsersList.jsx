import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UsersListTable from "./components/UsersListTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const UsersList = () => {
  const { data, isPending, error, isFetched } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-all-users`
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
          Lista De Usuarios
        </Typography>

        <UsersListTable
          users={data?.data}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default UsersList;
