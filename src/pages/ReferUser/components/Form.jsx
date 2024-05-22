import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useSearchParams } from 'react-router-dom';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SelectInputComponent from '../../../components/SelectInputComponent';

const Form = ({ handleSubmit, isPending }) => {
  const [searchParams] = useSearchParams();

  const [classService, setClassService] = useState(
    searchParams.get('tipoServicio')
  );
  const [service, setService] = useState(searchParams.get('servicio'));

  const onChangeClassService = (e) => {
    setClassService(e.target.value);
    setService('');
  };

  console.log({ classService, service });

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '30rem',
        margin: 'auto',
      }}
    >
      <FormControl focused fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          CLASE DE SERVICIO
        </InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="CLASE DE SERVICIO"
          name="tipoServicio"
          value={classService}
          onChange={onChangeClassService}
        >
          <MenuItem value={'Contable'}>Contable</MenuItem>
          <MenuItem value={'Juridico'}>Jurídico</MenuItem>
          <MenuItem value={'Transporte'}>Transporte</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" focused fullWidth>
        <InputLabel focused id="demo-simple-select-label">
          SERVICIO
        </InputLabel>

        {classService === 'Contable' ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={''}
          >
            <MenuItem value={'contable1'}>
              Cambio de Regimén Tributario
            </MenuItem>
            <MenuItem value={'contable2'}>
              Elaboración de Estados Financieros
            </MenuItem>
            <MenuItem value={'contable3'}>Reporte Ficha Ruc</MenuItem>
          </Select>
        ) : classService === 'Juridico' ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={''}
          >
            <MenuItem value={'juridico1'}>
              Elaboración Minuta Compra-Venta
            </MenuItem>
            <MenuItem value={'juridico2'}>Aumento de Capital Social</MenuItem>
            <MenuItem value={'juridico3'}>
              Registro Propiedad Vehicular
            </MenuItem>
          </Select>
        ) : classService === 'Transporte' ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={''}
          >
            <MenuItem value={'transporte1'}>
              Obtención Permiso Transporte Turism
            </MenuItem>
            <MenuItem value={'transporte2'}>
              Certificado de Bonificación
            </MenuItem>
            <MenuItem value={'transporte3'}>Cambio de Motor</MenuItem>
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SERVICIO"
            name="servicio"
            disabled={!classService}
            value={service}
            onChange={(e) => setService(e.target.value)}
            defaultValue={''}
          >
            <MenuItem value={'contable1'}>
              Cambio de Regimén Tributario
            </MenuItem>
            <MenuItem value={'contable2'}>
              Elaboración de Estados Financieros
            </MenuItem>
            <MenuItem value={'contable3'}>Reporte Ficha Ruc</MenuItem>
          </Select>
        )}
      </FormControl>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <FormControl size="small" focused fullWidth>
          <InputLabel focused>PRIORIDAD</InputLabel>

          <Select label="PRIORIDAD" name="prioridad" defaultValue={''}>
            <MenuItem value={'normal'}>Normal</MenuItem>
            <MenuItem value={'urgente'}>Urgente</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <SelectInputComponent
          inputLabel="Usuario Responsable"
          endpoint="/services/get-all-user-and-admin"
          inputName="encargado"
          labelKey="nombres"
        />
      </Box>

      <Box>
        <TextField
          sx={{ width: '100%' }}
          type="datetime-local"
          label="Fecha Inicio"
          size="small"
          focused
          name="fechaHoraAccion"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Button
          disabled={isPending}
          type="submit"
          variant="contained"
          sx={{ width: '100%' }}
        >
          <ExitToAppIcon fontSize="small" /> SOLICITAR
        </Button>

        {/* <Button
          to={'/admin/'}
          component={Link}
          variant="outlined"
          color="error"
          sx={{ width: '100%' }}
        >
          <ArrowBackIcon fontSize="small" />
          SALIR
        </Button> */}
      </Box>
    </Box>
  );
};

export default Form;
