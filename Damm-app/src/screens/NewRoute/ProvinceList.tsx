import React from 'react';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@mui/material';

const provinces = [
  'Àlaba', 'Alacant', 'Almeria', 'Astúries', 'Àvila', 'Badajoz', 'Barcelona', 'Burgos', 'Càceres', 'Cadis',
  'Cantàbria', 'Castelló', 'Ciudad Real', 'Còrdova', 'La Corunya', 'Conca', 'Girona', 'Granada', 'Guadalajara',
  'Guipúscoa', 'Huelva', 'Osca', 'Illes Balears', 'Jaén', 'Lleó', 'Lleida', 'Lugo', 'Madrid', 'Màlaga',
  'Múrcia', 'Navarra', 'Ourense', 'Palència', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segòvia',
  'Sevilla', 'Sòria', 'Tarragona', 'Santa Cruz de Tenerife', 'Terol', 'Toledo', 'València', 'Valladolid',
  'Biscaia', 'Zamora', 'Saragossa'
];

const ProvinceList = ({ selectedProvinces, setSelectedProvinces }) => {
  const handleToggle = (value: string) => () => {
    const currentIndex = selectedProvinces.indexOf(value);
    const newChecked = [...selectedProvinces];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedProvinces(newChecked);
  };

  return (
    <List>
      {provinces.map((province) => (
        <ListItem key={province} button onClick={handleToggle(province)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={selectedProvinces.indexOf(province) !== -1}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={province} />
        </ListItem>
      ))}
    </List>
  );
};

export default ProvinceList;
