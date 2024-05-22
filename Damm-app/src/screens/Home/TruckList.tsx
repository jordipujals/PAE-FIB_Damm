import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Title from '../../components/Title';

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
  createData(0, '4522-DPR', 'Lleida-Tarragona', 2, '6h', '540L/1.460L', 0, '+ Mes Detalls'),
  createData(1, '5168-GTK', 'Murcia-Alacant', 2, '8h', '600L/1.400L', 1, '+ Mes Detalls'),
  createData(2, '3079-JSD', 'Galicia', 3, '5h', '800L/1.200L', 0, '+ Mes Detalls'),
  createData(3, '1245-ABC', 'Barcelona', 1, '4h', '400L/1.200L', 0, '+ Mes Detalls'),
  createData(4, '9876-XYZ', 'Valencia', 2, '7h', '700L/1.300L', 2, '+ Mes Detalls'),
  createData(5, '7890-QWE', 'Madrid', 4, '3h', '300L/1.000L', 1, '+ Mes Detalls'),
  createData(6, '2345-OPQ', 'Sevilla', 3, '6h', '600L/1.800L', 0, '+ Mes Detalls'),
  createData(7, '6789-ZXC', 'Bilbao', 2, '5h', '500L/1.500L', 1, '+ Mes Detalls'),
  createData(8, '1357-DEF', 'Alicante', 1, '2h', '200L/800L', 0, '+ Mes Detalls'),
  createData(9, '2468-GHI', 'Malaga', 2, '7h', '700L/1.600L', 1, '+ Mes Detalls'),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function TruckList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    searchTerm.trim() === '' ||
    (
        row.Matricula.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        row.Zona_Ruta.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
);


return (
  <React.Fragment>
    <Title>Llistat de Camions</Title>
    <TextField
      type="text"
      placeholder="Buscar per matrícula o zona de ruta"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      style={{ marginBottom: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <TableContainer style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <Table size="medium">
        <TableHead>
          <TableRow>
          <TableCell align="center">Matricula</TableCell>
              <TableCell align="center">Zona de la Ruta</TableCell>
              <TableCell align="center">Parades Efectuades</TableCell>
              <TableCell align="center">Temps Promig</TableCell>
              <TableCell align="center">L Subministrats / L Totals</TableCell>
              <TableCell align="center">Incidencies</TableCell>
              <TableCell align="right">Detalls del Camio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.Id}>
              <TableCell align="center">{row.Matricula}</TableCell>
                <TableCell align="center">{row.Zona_Ruta}</TableCell>
                <TableCell align="center">{row.Parades_Efectuades}</TableCell>
                <TableCell align="center">{row.Temps_Promig}</TableCell>
                <TableCell align="center">{row.LitrosSubministrats_Total}</TableCell>
                <TableCell align="center" >{row.Incidencies}</TableCell>
                <TableCell align="right">{row.Detalls_Camio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </React.Fragment>
);
}