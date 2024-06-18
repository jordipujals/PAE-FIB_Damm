import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  CssBaseline, Box, Toolbar, Typography, Container, Grid, Paper,
  IconButton, List, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mainListItems } from '../../components/ListItems';
import Title from '../../components/Title';
import TruckMap from './RouteMap';

const drawerWidth: number = 240;

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

const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { stops, coords, routeTime } = state;
  const routeId = parseInt(id ?? '0', 10);
  
  const route = JSON.parse(localStorage.getItem('designedRoutes') || '[]').find((r: any) => r.id === routeId);

  if (!route) {
    return <Typography variant="h6">Ruta no trobada</Typography>;
  }

  const goBack = () => {
    navigate('/new-route');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="absolute" open={true}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" aria-label="go back" onClick={goBack} sx={{ marginRight: '36px' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Detall de la Ruta
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={true}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton>
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
                  <Title>Informació del Camió i Ruta</Title>
                  <Typography variant="body1"><strong>Província:</strong> {route.province}</Typography>
                  <Typography variant="body1"><strong>Matrícula del camió:</strong> {route.truckPlate}</Typography>
                  <Typography variant="body1"><strong>Capacitat del camió:</strong> {route.truckCapacity} L</Typography>
                  <Typography variant="body1"><strong>Litres subministrats:</strong> {route.beerLoad} L</Typography>
                  <Typography variant="body1"><strong>Litres restants:</strong> {route.remainingCapacity} L</Typography>
                  <Typography variant="body1"><strong>Horari de la Ruta:</strong> {routeTime}</Typography>
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
                        {stops.map((stop: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{stop.name}</TableCell>
                            <TableCell>{stop.city}</TableCell>
                            <TableCell>{stop.litDem} L</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TruckMap coords={coords} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RouteDetail;
