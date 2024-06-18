import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TruckStops = ({ stops }) => {
  const currentStopIndex = 2; // Índex de la parada actual

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>Detalls dels bars</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Posició a la ruta</TableCell>
              <TableCell>Nom del bar</TableCell>
              <TableCell>Litres a subministrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stops.map((stop, index) => {
              let color = 'black';
              if (index < currentStopIndex) color = '#D56E06'; // Color taronja per parades ja completades
              else if (index === currentStopIndex) color = 'darkgreen'; // Color verd fosc per la parada actual
              return (
                <TableRow key={index} style={{ color, fontWeight: index === currentStopIndex ? 'bold' : 'normal' }}>
                  <TableCell sx={{ color }}>{index + 1}</TableCell>
                  <TableCell sx={{ color }}>{stop.name}</TableCell>
                  <TableCell sx={{ color }}>{stop.liters} L</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TruckStops;
