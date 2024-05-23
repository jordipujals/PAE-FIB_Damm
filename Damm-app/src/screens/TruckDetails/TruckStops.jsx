import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TruckStops = ({ stops }) => (
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
            if (index < 3) color = '#D56E06'; 
            else if (index === 3) color = 'blue'; 
            return (
              <TableRow key={index}>
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

export default TruckStops;
