import React, { useState } from 'react';
import {
  CssBaseline, Box, Toolbar, Typography, Container, Grid, Paper,
  TextField, Button, Divider, IconButton, List
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems } from '../../components/ListItems';
import Title from '../../components/Title';
import ProvinceList from './ProvinceList';
import BarList, { bars } from './BarList';
import DesignedRoutes, { routes } from './DesignedRoutes';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Route {
  id: number;
  plate: string;
  zone: string;
  stops: number;
  startTime: string;
  endTime: string;
  length: string;
  beerMargin: string;
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

const NewRoute = () => {
  const [open, setOpen] = useState(true);
  const [maxLength, setMaxLength] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxBeer, setMaxBeer] = useState('');
  const [minStops, setMinStops] = useState('');
  const [maxStops, setMaxStops] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [designedRoutes, setDesignedRoutes] = useState<Route[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedBars, setSelectedBars] = useState<any[]>([]);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDesignRoutes = () => {
    // Filtrat de les rutes basat en els filtres aplicats
    const filteredRoutes = routes.filter((route) => {
      const routeEndTime = new Date(route.endTime.replace(' - ', 'T')).getTime();
      const filterEndTime = new Date(endDate).getTime();
      const length = parseFloat(route.length.replace('Km', ''));
      const beerMargin = parseFloat(route.beerMargin.replace('L', ''));

      const barProvinces = selectedBars.map(bar => bar.province);

      const provincesMatch = selectedProvinces.length === 0 || selectedProvinces.some(province => route.zone.includes(province));
      const barsMatch = selectedBars.length === 0 || barProvinces.some(province => route.zone.includes(province));
      const lengthMatch = maxLength === '' || length <= parseFloat(maxLength);
      const endDateMatch = endDate === '' || routeEndTime <= filterEndTime;
      const beerMatch = maxBeer === '' || beerMargin <= parseFloat(maxBeer);
      const minStopsMatch = minStops === '' || route.stops >= parseInt(minStops);
      const maxStopsMatch = maxStops === '' || route.stops <= parseInt(maxStops);

      return provincesMatch && barsMatch && lengthMatch && endDateMatch && beerMatch && minStopsMatch && maxStopsMatch;
    });

    setDesignedRoutes(filteredRoutes);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Afegir una nova ruta
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Configuració de la ruta</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Longitud màxima de la ruta (km)"
                        fullWidth
                        value={maxLength}
                        onChange={(e) => setMaxLength(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Duració màxima de la ruta (min)"
                        fullWidth
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Data límit de fi de la ruta"
                        fullWidth
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="L max de cervesa a reomplir (L)"
                        fullWidth
                        value={maxBeer}
                        onChange={(e) => setMaxBeer(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nombre mínim de parades"
                        fullWidth
                        value={minStops}
                        onChange={(e) => setMinStops(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nombre màxim de parades"
                        fullWidth
                        value={maxStops}
                        onChange={(e) => setMaxStops(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">Llistat de províncies</Typography>
                      <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
                        <ProvinceList selectedProvinces={selectedProvinces} setSelectedProvinces={setSelectedProvinces} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">Llistat de bars/locals</Typography>
                      <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
                        <BarList selectedBars={selectedBars} setSelectedBars={setSelectedBars} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleDesignRoutes}>
                  Dissenyar rutes
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', maxHeight: 300, overflow: 'auto' }}>
                  <Title>Rutes dissenyades</Title>
                  <DesignedRoutes
                    routes={designedRoutes}
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>
                  Cancel·lar
                </Button>
                <Button variant="contained" color="primary">
                  Confirmar ruta
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewRoute;
