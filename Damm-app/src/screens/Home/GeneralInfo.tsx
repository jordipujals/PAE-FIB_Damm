import React, { useState } from 'react';
import { Typography, Paper, Grid, ButtonGroup, Button, Box } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import Title from '../../components/Title';

const GeneralInfo = () => {
  const [interval, setInterval] = useState('Diari'); 

  // Función para cambiar el intervalo
  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    // Aquí podrías realizar alguna lógica adicional, como cargar datos diferentes según el intervalo seleccionado
  };

  const theme = useTheme();
  const blueColor = theme.palette.primary.main;

  const StyledButton = styled(Button)({
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    border: `1px solid ${blueColor}`, 
    color: blueColor, 
    '&:hover': {
      backgroundColor: '#3f51b5',
      color: '#fff',
    },
  });

  return (
    <React.Fragment>
      <Box style={{ width: '100%', display: 'flex', paddingBottom: '8px' }}>
        <StyledButton sx={{ flex: 1, minHeight: 0, height: '20px', textTransform: 'none', fontSize: '0.7rem', marginRight: '5px'}} onClick={() => handleIntervalChange('Diari')}>Diari</StyledButton>
        <StyledButton sx={{ flex: 1, minHeight: 0, height: '20px', textTransform: 'none', fontSize: '0.7rem', marginRight: '5px' }} onClick={() => handleIntervalChange('Setmanal')}>Setmanal</StyledButton>
        <StyledButton sx={{ flex: 1, minHeight: 0, height: '20px', textTransform: 'none', fontSize: '0.7rem' }} onClick={() => handleIntervalChange('Mensual')}>Mensual</StyledButton>
      </Box>
      <Title>Estadístiques Generals ({interval})</Title>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <Typography component="p" sx={{ fontSize: '0.9rem' }}>Temps de ruta promig: [{interval}]</Typography>
        <Typography component="p" sx={{ fontSize: '0.9rem' }}>Nombre de parades promig: [{interval}]</Typography>
        <Typography component="p" sx={{ fontSize: '0.9rem' }}>Kilòmetres promig: [{interval}]</Typography>
        <Typography component="p" sx={{ fontSize: '0.9rem' }}>Litres entregats: [{interval}]</Typography>
        <Typography component="p" sx={{ fontSize: '0.9rem' }}>Litres sobrants: [{interval}]</Typography>
      </div>
    </React.Fragment>
  );
};

export default GeneralInfo;