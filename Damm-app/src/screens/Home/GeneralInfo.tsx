import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function GeneralInfo() {
    return (
        <React.Fragment>
        <Title>Estadistiques Generals</Title>
        <div style={{ flexGrow: 1, overflow: 'auto' }}>
          <Typography component="p">Tiempo de ruta promedio: [1]</Typography>
          <Typography component="p">Número de paradas diarias promedio: [1]</Typography>
          <Typography component="p">Kilómetros promedio: [1]</Typography>
          <Typography component="p">Entregados: [1]</Typography>
          <Typography component="p">Sobrantes: [1]</Typography>
        </div>
      </React.Fragment>
      );
}