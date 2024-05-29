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
import ServicesByUserTable from "./components/ServicesByUserTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function filterObjects(array, filterObject) {
  // Helper function to get nested property value
  function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }

  return array?.filter((obj) => {
    // Verifica si todos los pares clave-valor en filterObject coinciden en el objeto actual
    return Object.entries(filterObject).every(([key, value]) => {
      // Si el valor es null, undefined o una cadena vacía, no se filtra por esa clave
      if (value === null || value === undefined || value === "") {
        return true;
      }

      // Si la clave es 'fechaHasta', no la procesamos aquí, se manejará por fuera
      if (key === "fechaHasta") {
        let dateString = getNestedValue(obj, "fechaHoraAccion");
        const dateSplitted = dateString.split(" ");

        return filterObject?.fechaHasta >= dateSplitted[0];
      }

      // Si la clave es 'fechaHoraAccion', comparamos si está dentro del rango de fechas
      if (key === "fechaHoraAccion") {
        let dateString = getNestedValue(obj, "fechaHoraAccion");
        const dateSplitted = dateString.split(" ");

        if (filterObject?.fechaHoraAccion && filterObject?.fechaHasta) {
          return (
            dateSplitted[0] >= filterObject?.fechaHoraAccion &&
            dateSplitted[0] <= filterObject?.fechaHasta
          );
        }

        if (filterObject?.fechaHoraAccion) {
          return filterObject?.fechaHoraAccion <= dateSplitted[0];
        }
      }

      // Obtiene el valor anidado usando la clave dinámica
      const objValue = getNestedValue(obj, key);

      // Si la clave no está presente en el objeto actual, retorna false
      if (objValue === undefined) {
        return false;
      }

      // Si el valor en el objeto incluye el valor del filtro (ignorando mayúsculas y minúsculas)
      return objValue
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    });
  });
}

const ServicesByUser = () => {
  const { data, isPending, error, isFetched } = useQuery({
    queryKey: ["allAttendedClientXService"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/services/get-servicios-por-usuario`
      ),
  });

  console.log(data)

  const numeroServicios = data?.data?.map((item) => item?.numeroServicio);

  const [filterDateColumn, setFilterDateColumn] = useState([]);
  const [filtering, setFiltering] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filterTableInfo = {
      fechaHoraAccion: e?.target?.fromDate?.value,
      fechaHasta: e?.target?.toDate?.value,
      estado: e?.target?.estado?.value,
      "encargado.nombres": e?.target?.clientName?.value,
    };

    const objetosFiltrados = filterObjects(data?.data, filterTableInfo);
    setFilterDateColumn(objetosFiltrados);
  };

  const handleGenerateReport = () => {
    const dataToExport =
      filterDateColumn.length === 0 ? data?.data : filterDateColumn;

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Servicios Por Usuario");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "Reporte_Servicios_Por_Usuario.xlsx");
  };

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
          Servicios Por Usuario
        </Typography>

        <Box
          onSubmit={handleSubmit}
          component={"form"}
          sx={{ marginBottom: "2.5rem" }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              marginBottom: ".4rem",
              fontWeight: "bold",
            }}
            variant="body2"
          >
            RESPONSABLE:
          </Typography>
          <TextField
            size="small"
            type="text"
            label="Buscar por nombre de usuario..."
            variant="filled"
            name="clientName"
          />

          <Box sx={{ display: "flex", marginTop: " 1rem ", gap: "1rem" }}>
            <Box>
              <FormControl focused fullWidth>
                <InputLabel focused id="demo-simple-select-label">
                  ESTADO
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="ESTADO"
                  sx={{ padding: ".1rem", height: "2.5rem" }}
                  name="estado"
                  defaultValue={""}
                >
                  <MenuItem value={"todos"}>Todos</MenuItem>
                  <MenuItem value={"recibido"}>Recibidos</MenuItem>
                  <MenuItem value={"atendido"}>Finalizados</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                <SearchOutlinedIcon fontSize="small" /> Buscar
              </Button>
            </Box>

            <Box>
              <Box sx={{ display: "flex", gap: ".7rem" }}>
                <Box sx={{ flex: "1" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    type="date"
                    label="DESDE"
                    size="small"
                    focused
                    name="fromDate"
                  />
                </Box>

                <Box sx={{ flex: "1" }}>
                  {" "}
                  <TextField
                    sx={{ width: "100%" }}
                    type="date"
                    label="AL"
                    size="small"
                    focused
                    name="toDate"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Typography variant="subtitle1">
            <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              Número de Servicios:
            </span>{" "}
            {numeroServicios?.length}
          </Typography>

          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={handleGenerateReport}
            >
              Generar Reporte
            </Button>
          </Box>
        </Box>

        <ServicesByUserTable
          services={
            filterDateColumn?.length === 0 ? data?.data : filterDateColumn
          }
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default ServicesByUser;
