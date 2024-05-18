import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import {
  formatearFechaMonth,
  obtenerFechas,
} from "../../../utils/dateUtilities";
import TableChartIcon from "@mui/icons-material/TableChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart, LineChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const Metrics = ({ userInfo }) => {
  const fechas = obtenerFechas();

  const { data, isPending, error } = useQuery({
    queryKey: ["todasConsultas"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/chat-bot/get-consultas?fecha1=${
          fechas.fecha1
        }&fecha2=${fechas.fecha2}&fecha3=${fechas.fecha3}`
      ),
  });

  if (isPending) {
    return <p>Cargando...</p>;
  }

  const fechasMapeadas = data?.data?.map((fechas) => ({
    ...fechas,
    fechaNombre: formatearFechaMonth(fechas?.fecha),
  }));

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Enero",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Febrero",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Marzo",
    },
  ];

  const otherSetting = {
    height: 300,
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  const valueFormatter = (value) => `${value}mm`;

  return (
    <>
      {userInfo?.role === "admin" ? (
        <>
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "1.4rem" }}>
            <Box
              sx={{
                flex: "1",
                border: "1px solid #AAA",
                boxShadow: "0 0 3px rgba(0, 0, 0, .8)",
                borderRadius: "5px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "end",
                  gap: ".4rem",
                  borderBottom: "1px solid #AAA",
                  padding: ".5rem",
                }}
                color={`#525659`}
                variant="h7"
              >
                <StackedBarChartIcon />
                Consultas resueltas por el chatbot
              </Typography>

              <LineChart
                dataset={fechasMapeadas}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "fechaNombre",
                  },
                ]}
                series={[{ dataKey: "count" }]}
                {...otherSetting}
                height={300}
              />
            </Box>

            <Box
              sx={{
                flex: "1",
                border: "1px solid #AAA",
                boxShadow: "0 0 3px rgba(0, 0, 0, .8)",
                borderRadius: "5px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "end",
                  gap: ".4rem",
                  borderBottom: "1px solid #AAA",
                  padding: ".5rem",
                }}
                color={`#525659`}
                variant="h7"
              >
                <AnalyticsIcon />
                Cantidad de servicios atendidos
              </Typography>

              <BarChart
                dataset={dataset}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "month",
                  },
                ]}
                series={[{ dataKey: "seoul" }]}
                {...otherSetting}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: "1",
              border: "1px solid #AAA",
              boxShadow: "0 0 3px rgba(0, 0, 0, .8)",
              borderRadius: "5px",
              margin: "1rem 0",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "end",
                gap: ".4rem",
                borderBottom: "1px solid #AAA",
                padding: ".5rem",
              }}
              color={`#525659`}
              variant="h7"
            >
              <TableChartIcon />
              Usuarios con más servicios atendidos
            </Typography>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default Metrics;
