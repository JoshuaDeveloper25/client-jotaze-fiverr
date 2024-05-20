import ModalComponent from '../../admin/components/ModalComponent';
import { formatoFechaYearMonth } from '../../utils/dateUtilities';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import AppContext from '../../context/AppProvider';
import { getError } from '../../utils/getError';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { toast } from 'react-toastify';
import Form from './components/Form';
import axios from 'axios';

const LogIn = () => {
  const { setUserInfo } = useContext(AppContext);
  const [serviceNumber, setServiceNumber] = useState();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      ),
    onSuccess: (res) => {
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('¡Accedido exitosamente!');
      setUserInfo(res.data);
      console.log(res);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res?.data?.token}`;

      if (res.data.role === 'client') {
        navigate('/admin/registrar-servicio');
      } else if (res?.data?.role === 'user') {
        navigate('/admin/');
      }
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const chatBotMutation = useMutation({
    mutationFn: async (chatInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/chat-bot/register-resuelta`,
        chatInfo
      ),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const searchServiceNumber = useMutation({
    mutationFn: async () =>
      await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/services/search-service-by-no-solicitud/${serviceNumber}`
      ),
    onSuccess: (data) => {
      toast.success('¡Cliente encontrado!');
      navigate(`/buscar-servicio`, { state: { info: data?.data } });
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
      password: e?.target.password?.value.trim(),
    };

    if ([userInfo?.email, userInfo?.password].includes('')) {
      return toast.error('¡Llena los espacios disponibles!');
    }

    mutate({
      email: userInfo?.email,
      password: userInfo?.password,
    });
  };

  const steps = [
    {
      id: '1',
      message:
        'HOLA SOMOS LA EMPRESA G&G GROUP TRADING BRINDAMOS 3 TIPOS DE SERVICIOS ELIJA CUAL DE ELLAS DESEA CONSULTAR',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Contable 1', trigger: '3' },
        { value: 2, label: 'Juridico 2', trigger: '3' },
        { value: 3, label: 'Transporte 3', trigger: '3' },
      ],
    },
    {
      id: '3',
      message:
        'USTED HA ELEGIDO LA OPCION 1 TENEMOS ESTA LISTA DE SERVICIOS SOBRE EL RUBRO CONTABLE ELIJA UNA:',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 1, label: '1.CAMBIO DE REGIMEN TRIBUTARIO', trigger: '1' },
        {
          value: 2,
          label: '2.ELABORACION DE ESTADOS FINANCIEROS',
          trigger: '1',
        },
        { value: 3, label: '3. REPORTE FICHA RUC', trigger: '5' },
      ],
    },
    {
      id: '5',
      message:
        'PARA OBTENER LA FICHA RUC LOS DEBE ENVIARNOS SU NUMERO DE RUC Y SU CLAVE SOL, ¿DESEA REGISTRAR SU SERVICIO? ELIJA SI O NO',
      trigger: '6',
    },
    {
      id: '6',
      options: [
        { value: 1, label: 'Si', trigger: '7' },
        {
          value: 2,
          label: 'No',
          trigger: '1',
        },
      ],
    },
    {
      id: '7',
      end: true,
      component: (
        <div>
          <Typography px={2}>
            CHATBOT: DEBE TENER UNA CUENTA PARA REGISTRAR SU SERVICIO EN EL
            SIGUIENTE LINK :{' '}
            <Link to={'#'}>www.groupgyg.com/registrodeservicio</Link> EN CASO NO
            TENGA UNA CUENTA REGISTRESE EN EL SIGUIENTE LINK{' '}
            <Link to={'#'}>www.groupgyg.com/registrodecliente</Link>
          </Typography>
        </div>
      ),
    },
  ];

  const searchService = () => {
    if ([serviceNumber].includes('')) {
      return toast.error('¡Llena los campos disponibles!');
    }

    searchServiceNumber?.mutate({ serviceNumber: serviceNumber });
  };

  return (
    <Container maxWidth={'lg'}>
      <Form
        handleSubmit={handleSubmit}
        isPending={isPending}
        setOpen={setOpen}
        open={open}
      />
      <Box position={'fixed'} bottom={0} right={20}>
        <ChatBot
          handleEnd={({ steps }) => {
            chatBotMutation?.mutate({
              resuelta: 1,
              createdAt: formatoFechaYearMonth(new Date()),
            });
          }}
          floating={true}
          steps={steps}
        />
      </Box>

      <ModalComponent
        modalTitle={'Buscar Servicio'}
        handleClose={handleClose}
        open={open}
      >
        <TextField
          type="text"
          label="Número de Solicitud"
          variant="filled"
          name="requestNumber"
          value={serviceNumber}
          onChange={(e) => setServiceNumber(e?.target?.value)}
          sx={{ marginBottom: '1rem', width: '100%' }}
        />

        <Button
          variant="outlined"
          sx={{ marginBottom: '.8rem', width: '100%' }}
          onClick={searchService}
        >
          <SearchIcon />
          Buscar Servicio
        </Button>
      </ModalComponent>
    </Container>
  );
};

export default LogIn;
