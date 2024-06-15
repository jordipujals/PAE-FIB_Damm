import React, { useState, useEffect } from 'react';
import {
  CssBaseline, Box, Toolbar, Typography, Container, Grid, Paper,
  Button, Divider, IconButton, List, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { SelectChangeEvent } from '@mui/material/Select';
import { mainListItems } from '../../components/ListItems';
import Title from '../../components/Title';
import provinces from '../../components/ProvinceList';
import BarList from '../../components/BarList';
import { availableTrucks } from '../../components/TruckList';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Location {
  id: string;
  name: string;
  province: string;
  city: string;
  litDem: string;
  billingLatitude: string;
  billingLongitude: string;
  obertura: string;
  tancament: string;
  status?: string;
  postalCode?: string;
  idSAP?: string;
  distributor?: string;
  type?: string;
}

interface Route {
  id: number;
  province: string;
  stops: Location[];
  truckCapacity: number;
  beerLoad: number;
  remainingCapacity: number;
  truckPlate: string;
  routeTime: string;
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
  const [selectedProvince, setSelectedProvince] = useState(() => localStorage.getItem('selectedProvince') || '');
  const [filteredBars, setFilteredBars] = useState<Location[]>([]);
  const [designedRoutes, setDesignedRoutes] = useState<Route[]>(() => JSON.parse(localStorage.getItem('designedRoutes') || '[]'));
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [usedTruckIndices, setUsedTruckIndices] = useState<number[]>([]);
  const [showNoProvinceSelectedMessage, setShowNoProvinceSelectedMessage] = useState(false);
  const [showNoBarsMessage, setShowNoBarsMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTruckIndices = JSON.parse(localStorage.getItem('usedTruckIndices') || '[]');
    setUsedTruckIndices(storedTruckIndices);
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const goBack = () => {
    navigate('/home');
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Radi de la Terra en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getNextTruck = (index: number) => {
    if (index >= availableTrucks.length) {
      throw new Error('No queden més camions disponibles');
    }
    return availableTrucks[index];
  };

  const calculateRoutes = (bars: Location[]) => {
    const maxTruckCapacity = 5000;
    const minTruckCapacity = 2000;
    const routes: Route[] = [];
    let truckIndex = 0;

    const groupedByProvince = bars.reduce((acc, bar) => {
      if (!acc[bar.province]) {
        acc[bar.province] = [];
      }
      acc[bar.province].push(bar);
      return acc;
    }, {} as Record<string, Location[]>);

    const createRoute = (provinceBars: Location[], routeTime: string) => {
      let currentRoute: Location[] = [];
      let currentLoad = 0;

      provinceBars.forEach((bar, i) => {
        const barLoad = parseInt(bar.litDem);

        if (currentLoad + barLoad <= maxTruckCapacity) {
          currentRoute.push(bar);
          currentLoad += barLoad;
        } else {
          const routeCapacity = currentLoad <= minTruckCapacity ? minTruckCapacity : maxTruckCapacity;
          const truck = getNextTruck(truckIndex++);
          routes.push({
            id: routes.length + 1,
            province: bar.province,
            stops: currentRoute,
            truckCapacity: routeCapacity,
            beerLoad: currentLoad,
            remainingCapacity: routeCapacity - currentLoad,
            truckPlate: truck.matricula,
            routeTime
          });
          currentRoute = [bar];
          currentLoad = barLoad;
        }
      });

      if (currentRoute.length > 0) {
        const routeCapacity = currentLoad <= minTruckCapacity ? minTruckCapacity : maxTruckCapacity;
        const truck = getNextTruck(truckIndex++);
        routes.push({
          id: routes.length + 1,
          province: currentRoute[0].province,
          stops: currentRoute,
          truckCapacity: routeCapacity,
          beerLoad: currentLoad,
          remainingCapacity: routeCapacity - currentLoad,
          truckPlate: truck.matricula,
          routeTime
        });
      }
    };

    if (selectedProvince && selectedProvince !== "") {
      const provinceBars = groupedByProvince[selectedProvince] || [];
      if (provinceBars.length > 0) {
        const morningBars = provinceBars.filter(bar => bar.obertura >= '08:00' && bar.tancament <= '14:00');
        const afternoonBars = provinceBars.filter(bar => bar.obertura >= '15:00' && bar.tancament <= '21:00');
        createRoute(morningBars, '08:00 - 14:00');
        createRoute(afternoonBars, '15:00 - 21:00');
        setShowNoBarsMessage(false);
      } else {
        setShowNoBarsMessage(true);
      }
    } else {
      if (Object.keys(groupedByProvince).length > 0) {
        Object.keys(groupedByProvince).forEach(province => {
          const provinceBars = groupedByProvince[province];
          if (provinceBars.length > 0) {
            const morningBars = provinceBars.filter(bar => bar.obertura >= '08:00' && bar.tancament <= '14:00');
            const afternoonBars = provinceBars.filter(bar => bar.obertura >= '15:00' && bar.tancament <= '21:00');
            createRoute(morningBars, '08:00 - 14:00');
            createRoute(afternoonBars, '15:00 - 21:00');
          }
        });
        setShowNoBarsMessage(false);
      } else {
        setShowNoBarsMessage(true);
      }
    }

    setDesignedRoutes(routes);
    localStorage.setItem('designedRoutes', JSON.stringify(routes));
  };

  const handleDesignRoutes = () => {
    setShowNoProvinceSelectedMessage(false);
    setShowNoBarsMessage(false);
    setDesignedRoutes([]); // Buidar les rutes dissenyades abans de mostrar els missatges
    if (selectedProvince === "") {
      setShowNoProvinceSelectedMessage(true);
      calculateRoutes(filteredBars); // Continuar dissenyant rutes fins i tot si no es selecciona cap província
    } else {
      calculateRoutes(filteredBars);
    }
  };

  const handleRouteSelection = (routeId: number) => {
    setSelectedRoutes(prevSelected =>
      prevSelected.includes(routeId)
        ? prevSelected.filter(id => id !== routeId)
        : [...prevSelected, routeId]
    );
  };

  const handleProvinceChange = (event: SelectChangeEvent<string>) => {
    const province = event.target.value as string;
    setSelectedProvince(province);
    localStorage.setItem('selectedProvince', province);
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
            <IconButton edge="start" color="inherit" aria-label="go back" onClick={goBack}>
              <ArrowBackIcon />
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
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel>Selecciona una província</InputLabel>
                        <Select
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                        >
                          <MenuItem value=""><em>Totes</em></MenuItem>
                          {provinces.map((province) => (
                            <MenuItem key={province} value={province}>{province}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h6">Llistat de bars/locals</Typography>
                      <Paper sx={{ maxHeight: 300, overflow: 'auto' }}>
                        <BarList selectedProvince={selectedProvince} setFilteredBars={setFilteredBars} />
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
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', maxHeight: 500, overflow: 'auto' }}>
                  <Title>Rutes dissenyades</Title>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Selecciona</TableCell>
                          <TableCell>Província</TableCell>
                          <TableCell>Numero de parades</TableCell>
                          <TableCell>Litres de cervesa que subministrarà</TableCell>
                          <TableCell>Litres de cervesa que quedaran</TableCell>
                          <TableCell>Capacitat del camió</TableCell>
                          <TableCell>Matrícula del camió</TableCell>
                          <TableCell>Horari de la Ruta</TableCell>
                          <TableCell>Detall de la ruta</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {designedRoutes.length > 0 && designedRoutes.map((route) => (
                          <TableRow key={route.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedRoutes.includes(route.id)}
                                onChange={() => handleRouteSelection(route.id)}
                              />
                            </TableCell>
                            <TableCell>{route.province}</TableCell>
                            <TableCell>{route.stops.length}</TableCell>
                            <TableCell>{route.beerLoad}</TableCell>
                            <TableCell>{route.remainingCapacity}</TableCell>
                            <TableCell>{route.truckCapacity} L</TableCell>
                            <TableCell>{route.truckPlate}</TableCell>
                            <TableCell>{route.routeTime}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/route-detail/${route.id}`)}
                              >
                                Veure detall
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {designedRoutes.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={9}>
                              {showNoProvinceSelectedMessage ? (
                                <Typography variant="h6" align="center">
                                  Selecciona una província per a poder dissenyar les rutes de repartiment.
                                </Typography>
                              ) : showNoBarsMessage ? (
                                <Typography variant="h6" align="center">
                                  No s'ha pogut generar cap ruta per la província seleccionada.
                                </Typography>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
