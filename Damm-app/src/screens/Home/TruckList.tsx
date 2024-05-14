import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title'

// Generate Truck Data
function createData(
  Id: number,
  Matricula: string,
  Zona_Ruta: string,
  Parades_Efectuades: number,
  Temps_Promig: string,
  LitrosSubministrats_Total: string,
  Incidencies: number,
  Detalls_Camio: string,
) {
  return { Id, Matricula, Zona_Ruta, Parades_Efectuades, Temps_Promig, LitrosSubministrats_Total, Incidencies, Detalls_Camio };
}

const rows = [
  createData(0, '4522-DPR', 'Lleida-Tarragona', 2, '6h', '540L/1.460L', 0, 'More Details'),
  createData(1, '5168-GTK', 'Murcia-Alacant', 2, '8h', '600L/1.400L', 1, 'More Details',),
  createData(2, '3079-JSD', 'Galicia', 3, '5h', '800L/1.200L', 0, 'More Details'),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Llistat de Camions</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Matricula</TableCell>
            <TableCell>Zona de la Ruta</TableCell>
            <TableCell>Parades Efectuades</TableCell>
            <TableCell>Temps Promig</TableCell>
            <TableCell>L Subministrats / L Totals</TableCell>
            <TableCell>Incidencies</TableCell>
            <TableCell align="right">+ Detalls del Camio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id}>
              <TableCell>{row.Matricula}</TableCell>
              <TableCell>{row.Zona_Ruta}</TableCell>
              <TableCell>{row.Parades_Efectuades}</TableCell>
              <TableCell>{row.Temps_Promig}</TableCell>
              <TableCell>{row.LitrosSubministrats_Total}</TableCell>
              <TableCell>{row.Incidencies}</TableCell>
              <TableCell align="right">{row.Detalls_Camio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}