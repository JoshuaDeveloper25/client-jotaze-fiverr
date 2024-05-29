import ModalComponent from "../../../components/ModalComponent";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "../../../../components/Table";

import { Link, Link as RouterLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

const ServicesByUserTable = ({ services = [], setFiltering, filtering }) => {
  return (
    <Table
      data={services}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "col1",
          accessorKey: "numeroServicio",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              {/* <NumbersIcon /> */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Número de Solicitud
              </Typography>
            </Box>
          ),
        },

        {
          id: "col2",
          accessorKey: "",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              {/* <FormatListNumberedIcon /> */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Usuario
              </Typography>
            </Box>
          ),
          cell: (info) => {
            const value = info.cell.row.original;

            return (
              <>
                <p>
                  {value?.encargado?.nombres} {value?.encargado?.apellidos}
                </p>
              </>
            );
          },
        },

        {
          id: "col3",
          accessorKey: "tipoServicio",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              {/* <AppRegistrationIcon /> */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Clase Servicio
              </Typography>
            </Box>
          ),
        },

        {
          id: "col4",
          accessorKey: "estado",
          header: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              {/* <AppRegistrationIcon /> */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: ".9rem",
                }}
              >
                Estado Servicio
              </Typography>
            </Box>
          ),
        },

        {
          id: "col5",
          accessorKey: "",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <AccessibilityIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Fecha Inicio
                </Typography>
              </Box>
            );
          },
          cell: (info) => {
            const value = info.cell.row.original;

            return (
              <>
                <p>{value?.fechaHoraAccion}</p>
              </>
            );
          },
        },

        {
          id: "col6",
          accessorKey: "",
          header: () => {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
                {/* <AccessibilityIcon /> */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ".9rem",
                  }}
                >
                  Fecha Fin
                </Typography>
              </Box>
            );
          },
          cell: (info) => {
            const value = info.cell.row.original;

            return (
              <>
                <p>{value?.fechaHoraFin}</p>
              </>
            );
          },
        },
      ]}
    />
  );
};

export default ServicesByUserTable;
