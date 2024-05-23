import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const TruckInfo = ({ truck }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6">Informació del camió i la ruta</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1"><strong>Matrícula del camió:</strong> {truck.Matricula}</Typography>
        <Typography variant="body1"><strong>Nom del repartidor:</strong> {truck.driver}</Typography>
        <Typography variant="body1"><strong>Telèfon de contacte:</strong> {truck.contact}</Typography>
        <Typography variant="body1"><strong>Zona/es de la ruta:</strong> {truck.Zona_Ruta}</Typography>
        <Typography variant="body1"><strong>Longitud de la ruta:</strong> {truck.length} Km</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1"><strong>Hora i data d'inici de ruta:</strong> {truck.startTime}</Typography>
        <Typography variant="body1"><strong>Hora i data de fi de ruta:</strong> {truck.endTime}</Typography>
        <Typography variant="body1"><strong>Parades completades:</strong> {truck.completedStops} completades de {truck.totalStops}</Typography>
        <Typography variant="body1"><strong>Temps a la següent parada:</strong> <span style={{ color: 'green' }}>{truck.nextStopTime}</span></Typography>
        <Typography variant="body1"><strong>Marge de Litres de cervesa:</strong> {truck.beerRemaining} L</Typography>
      </Grid>
    </Grid>
  </Box>
);

export default TruckInfo;
