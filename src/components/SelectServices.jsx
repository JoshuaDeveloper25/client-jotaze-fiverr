/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const SelectServices = ({
  nameInputClass,
  nameInputType,
  setClassService,
  classService,
  setTypeService,
  typeService,
}) => {
  const { data, error, isError, isFetched, isLoading } = useQuery({
    queryKey: ["allServicesListRegistered"],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BASE_URL}/class-service/get-all-class-service`
      ),
  });

  const handleChangeClass = (e) => {
    setClassService(e?.target?.value);
    setTypeService("");
  };

  if (isError) return <p>Ocurrio Algo</p>;

  return (
    <>
      <FormControl size="small" focused fullWidth disabled={isLoading}>
        <InputLabel focused id="demo-simple-select-label" >
          {"CLASE DE SERVICIO"}
        </InputLabel>

        <Select
          onChange={handleChangeClass}
          label={"CLASE DE SERVICIO"}
          name={nameInputClass}
          defaultValue={""}
          value={classService}
        >
          {data?.data?.map((item, idx) => (
            <MenuItem value={item?.claseServicio} key={idx}>
              {item?.claseServicio}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        focused
        fullWidth
        disabled={
          isLoading ||
          !data?.data?.find((item) => item?.claseServicio === classService)
        }
      >
        <InputLabel focused id="demo-simple-select-label">
          {"TIPO DE SERVICIO"}
        </InputLabel>

        <Select
          label={"TIPO DE SERVICIO"}
          name={nameInputType}
          defaultValue={""}
          onChange={(e) => setTypeService(e?.target?.value)}
          value={typeService}
        >
          {data?.data
            ?.find((item) => item?.claseServicio === classService)
            ?.tipoServicio?.map((item, idx) => (
              <MenuItem value={item?.descripcion} key={idx}>
                {item?.descripcion}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectServices;
