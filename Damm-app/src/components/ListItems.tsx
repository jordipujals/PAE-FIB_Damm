import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/new-route">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Ruta" />
    </ListItemButton>
    <ListItemButton component={Link} to="/manual-stop">
      <ListItemIcon>
        <AddLocationAltIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Parada" />
    </ListItemButton >
    {/*Eliminar els que sobrin estan d'exemple*/}
  </React.Fragment>
);