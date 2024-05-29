/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SelectInputComponent = ({
  endpoint = '',
  valueKey = '_id',
  labelKey = '',
  inputLabel = '',
  queryKey = [],
  inputName = '',
}) => {
  const { data, error, isError, isFetched, isLoading } = useQuery({
    queryKey,
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`)
        .then((res) => res.data),
  });

  if (isError) return <p>Ocurrio Algo</p>;

  return (
    <FormControl size="small" focused fullWidth disabled={isLoading}>
      <InputLabel focused id="demo-simple-select-label">
        {inputLabel}
      </InputLabel>

      <Select label={inputLabel} name={inputName} defaultValue={''}>
        {data?.map((item, idx) => (
          <MenuItem value={item[valueKey]} key={idx}>
            {item[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInputComponent;
