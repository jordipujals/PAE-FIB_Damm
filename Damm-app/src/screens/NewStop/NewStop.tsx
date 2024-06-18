import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Toolbar, Typography, Container, Grid, Paper, Button, Divider, IconButton, List, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems } from '../../components/ListItems';
import Title from '../../components/Title';
import { SelectableBarList } from '../../components/BarList';
import RouteMap from './RouteMap';

const drawerWidth = 240;

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

const NewStop = () => {
  const [open, setOpen] = useState(true);
  const [selectedBar, setSelectedBar] = useState<Location | null>(null);
  const [filteredBars, setFilteredBars] = useState<Location[]>([]);
  const [designedRoute, setDesignedRoute] = useState<Route | null>(null);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const goBack = () => {
    navigate('/home');
  };

  const handleRowClick = (bar: Location) => {
    setSelectedBar(bar);
  };

  const findRouteForSelectedBar = (bar: Location) => {
    const routes: Route[] = JSON.parse(localStorage.getItem('designedRoutes') || '[]');
    const route = routes.find(route => route.stops.some(stop => stop.id === bar.id));
    setDesignedRoute(route || null);
  };

  const handleRedesignRoutes = () => {
    if (selectedBar) {
      findRouteForSelectedBar(selectedBar);
      setShowRouteDetails(true);
    }
  };

  const handleConfirmRoute = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (selectedBar) {
      setShowRouteDetails(false); // Reset showRouteDetails when a new bar is selected
    }
  }, [selectedBar]);

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
              Nova Parada
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
                  <Title>Seleccionar parada</Title>
                  <SelectableBarList setFilteredBars={setFilteredBars} onRowClick={handleRowClick} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Detall del local</Title>
                  {selectedBar ? (
                    <Box>
                      <Typography variant="body1"><strong>Nom del bar:</strong> {selectedBar.name}</Typography>
                      <Typography variant="body1"><strong>Província:</strong> {selectedBar.province}</Typography>
                      <Typography variant="body1"><strong>Ciutat:</strong> {selectedBar.city}</Typography>
                      <Typography variant="body1"><strong>Litres a subministrar:</strong> {selectedBar.litDem} L</Typography>
                      <Typography variant="body1"><strong>Horari:</strong> {selectedBar.obertura} - {selectedBar.tancament}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" onClick={handleRedesignRoutes}>
                          Redissenyar rutes
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body2">Seleccioneu un bar de la llista per veure'n els detalls.</Typography>
                  )}
                </Paper>
              </Grid>
              {designedRoute && showRouteDetails && (
                <>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Title>Informació del Camió i Ruta</Title>
                      <Typography variant="body1"><strong>Província:</strong> {designedRoute.province}</Typography>
                      <Typography variant="body1"><strong>Matrícula del camió:</strong> {designedRoute.truckPlate}</Typography>
                      <Typography variant="body1"><strong>Capacitat del camió:</strong> {designedRoute.truckCapacity} L</Typography>
                      <Typography variant="body1"><strong>Litres subministrats:</strong> {designedRoute.beerLoad} L</Typography>
                      <Typography variant="body1"><strong>Litres restants:</strong> {designedRoute.remainingCapacity} L</Typography>
                      <Typography variant="body1"><strong>Horari de la Ruta:</strong> {designedRoute.routeTime}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Title>Parades de la Ruta</Title>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Posició</TableCell>
                              <TableCell>Nom del bar</TableCell>
                              <TableCell>Ciutat</TableCell>
                              <TableCell>Litres de cervesa</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {designedRoute.stops.map((stop, index) => (
                              <TableRow key={index} style={{ backgroundColor: stop.id === selectedBar?.id ? 'rgba(0, 100, 0, 0.1)' : 'inherit' }}>
                                <TableCell style={{ color: stop.id === selectedBar?.id ? 'darkgreen' : 'inherit', fontWeight: stop.id === selectedBar?.id ? 'bold' : 'normal' }}>{index + 1}</TableCell>
                                <TableCell style={{ color: stop.id === selectedBar?.id ? 'darkgreen' : 'inherit', fontWeight: stop.id === selectedBar?.id ? 'bold' : 'normal' }}>{stop.name}</TableCell>
                                <TableCell style={{ color: stop.id === selectedBar?.id ? 'darkgreen' : 'inherit', fontWeight: stop.id === selectedBar?.id ? 'bold' : 'normal' }}>{stop.city}</TableCell>
                                <TableCell style={{ color: stop.id === selectedBar?.id ? 'darkgreen' : 'inherit', fontWeight: stop.id === selectedBar?.id ? 'bold' : 'normal' }}>{stop.litDem} L</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <RouteMap coords={designedRoute.stops.map(stop => ({
                        lat: parseFloat(stop.billingLatitude),
                        lng: parseFloat(stop.billingLongitude),
                        selected: stop.id === selectedBar?.id
                      }))} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleConfirmRoute} sx={{ mt: 2 }}>
                      Confirmar ruta
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewStop;
