import React, { useEffect } from 'react';
import { Container, Typography, Paper, Box, CssBaseline, Toolbar, IconButton, Badge, Grid, Divider, List } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import TruckInfo from './TruckInfo';
import TruckCharts from './TruckCharts';
import TruckMap from './TruckMap';
import TruckStops from './TruckStops';
import Title from '../../components/Title';
import { mainListItems } from '../../components/ListItems';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

interface Truck {
  Id: number;
  Matricula: string;
  Zona_Ruta: string;
  Parades_Efectuades: number;
  Temps_Promig: string;
  LitrosSubministrats_Total: string;
  Incidencies: number;
  Detalls_Camio: string;
}

interface TruckDetailsProps {
  truck: Truck;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({ truck }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!truck) {
      navigate('/home'); // Redirigir a Home si no hi ha cap camió seleccionat
    }
  }, [truck, navigate]);

  if (!truck) {
    return null; // Mostra res si no hi ha cap camió seleccionat
  }

  const stops = truck.Id === 0 ? [
    { name: "Bar Kentucky (Tarragona)", liters: 300 },
    { name: "Bar Kram (Tarragona)", liters: 240 },
    { name: "Bar El Terrat (Valls)", liters: 430 },
    { name: "Restaurant El Llorer (Igualada)", liters: 345 },
    { name: "Bar Cal Pep (Cervera)", liters: 260 },
    { name: "Restaurant El Celler (Tàrrega)", liters: 195 },
    { name: "Bar del Pla (Lleida)", liters: 210 },
    { name: "Cafeteria Slàvia (Lleida)", liters: 220 },
  ] : [
    { name: "Café Iruña", liters: 320 },
    { name: "La Viña del Ensanche", liters: 335 },
    { name: "Bar El Globo", liters: 250 },
    { name: "Café Bar Bilbao", liters: 410 },
    { name: "Bar Restaurante Sorginzulo", liters: 220 },
    { name: "El Huevo Frito", liters: 270 },
    { name: "Café Bar Las Torres", liters: 210 },
  ];

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const truckData = truck.Id === 0 ? {
    Matricula: "4522-DPR",
    driver: "Ricard Salvador Solé",
    contact: "+34 689 901 341",
    Zona_Ruta: "Lleida - Tarragona",
    length: 168,
    startTime: "13:22 - 4/4/2024",
    endTime: "18:45 - 4/4/2024",
    completedStops: 3,
    totalStops: 7,
    nextStopTime: "54 minuts",
    beerRemaining: 210,
  } : {
    Matricula: "6789-ZXC",
    driver: "Maria López",
    contact: "+34 612 345 678",
    Zona_Ruta: "Bilbao",
    length: 48,
    startTime: "10:20 - 5/4/2024",
    endTime: "14:10 - 5/4/2024",
    completedStops: 3,
    totalStops: 7,
    nextStopTime: "14 minuts",
    beerRemaining: 14,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/home')} sx={{ marginRight: '16px' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Detalls del Camió
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
          </List>
        </Drawer>
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
              <TruckInfo truck={truckData} />
              <TruckCharts zonaRuta={truck.Id === 0 ? 'Lleida - Tarragona' : 'Bilbao'} />
              <TruckMap zonaRuta={truck.Id === 0 ? 'Lleida - Tarragona' : 'Bilbao'} />
              <TruckStops stops={stops} />
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TruckDetails;
