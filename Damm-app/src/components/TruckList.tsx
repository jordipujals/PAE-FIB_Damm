import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, InputAdornment, TextField, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

interface Truck {
  Id: number;
  Matricula: string;
  Zona_Ruta: string;
  Parades_Efectuades: number;
  Temps_Promig: string;
  LitrosSubministrats_Total: string;
  Incidencies: number;
  Detalls_Camio: string;
}

interface TruckListProps {
  onTruckClick: (truck: Truck) => void;
}


// src/components/TruckList.tsx

export const availableTrucks = [
  { id: 1, matricula: '2679-BRQ' },
  { id: 2, matricula: '8593-JHP' },
  { id: 3, matricula: '4372-JMN' },
  { id: 4, matricula: '5213-LST' },
  { id: 5, matricula: '6824-MVW' },
  { id: 6, matricula: '3746-GPR' },
  { id: 7, matricula: '4857-CQW' },
  { id: 8, matricula: '5968-BRV' },
  { id: 9, matricula: '2079-DBX' },
  { id: 10, matricula: '3180-MCY' },
  { id: 11, matricula: '4291-BDZ' },
  { id: 12, matricula: '5402-JGF' },
  { id: 13, matricula: '6513-MHH' },
  { id: 14, matricula: '7624-LJK' },
  { id: 15, matricula: '8735-GLM' },
  { id: 16, matricula: '9846-HNP' },
  { id: 17, matricula: '1957-DVQ' },
  { id: 18, matricula: '3068-FRT' },
  { id: 19, matricula: '4179-BRT' },
  { id: 20, matricula: '5280-LRT' },
  { id: 21, matricula: '6391-JSW' },
  { id: 22, matricula: '7412-KTX' },
  { id: 23, matricula: '8533-MVY' },
  { id: 24, matricula: '9644-CWZ' },
  { id: 25, matricula: '1755-DBJ' },
  { id: 26, matricula: '2866-JDL' },
  { id: 27, matricula: '3977-GFK' },
  { id: 28, matricula: '5088-LHM' },
  { id: 29, matricula: '6199-JLP' },
  { id: 30, matricula: '7210-MNS' },
  { id: 31, matricula: '8321-HPQ' },
  { id: 32, matricula: '9432-CQT' },
  { id: 33, matricula: '1543-DWX' },
  { id: 34, matricula: '2654-JXZ' },
  { id: 35, matricula: '3765-GBC' },
  { id: 36, matricula: '4876-LDE' },
  { id: 37, matricula: '5987-MFG' },
  { id: 38, matricula: '1698-HHJ' },
  { id: 39, matricula: '2709-CHK' },
  { id: 40, matricula: '3810-JLN' },
  { id: 41, matricula: '4921-GLP' },
  { id: 42, matricula: '5032-LMR' },
  { id: 43, matricula: '6143-MNT' },
  { id: 44, matricula: '7254-HPQ' },
  { id: 45, matricula: '8365-CRS' },
  { id: 46, matricula: '9476-DBU' },
  { id: 47, matricula: '1587-JGV' },
  { id: 48, matricula: '2698-GLW' },
  { id: 49, matricula: '3709-HNX' },
  { id: 50, matricula: '4810-CYZ' },
];

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
  createData(0, '4522-DPR', 'Lleida', 3, '6h', '460L/1.540L', 0, 'Més detalls'),
  createData(1, '5168-GTK', 'Murcia', 2, '8h', '600L/1.400L', 1, 'Més detalls'),
  createData(2, '3079-JSD', 'Galicia', 3, '5h', '800L/1.200L', 0, 'Més detalls'),
  createData(3, '1245-ABC', 'Barcelona', 1, '4h', '4.000L/1.000L', 0, 'Més detalls'),
  createData(4, '9876-XYZ', 'Valencia', 2, '7h', '3.500L/1.500L', 2, 'Més detalls'),
  createData(5, '7890-QWE', 'Madrid', 3, '3h', '1.000L/1.000L', 1, 'Més detalls'),
  createData(6, '2345-OPQ', 'Sevilla', 3, '6h', '1.200L/3.800L', 0, 'Més detalls'),
  createData(7, '6789-ZXC', 'Bilbao', 3, '4h', '1.300L/700L', 1, 'Més detalls'),
  createData(8, '1357-DEF', 'Alicante', 1, '2h', '500L/1.500L', 0, 'Més detalls'),
  createData(9, '2468-GHI', 'Malaga', 2, '7h', '1.400L/3.600L', 1, 'Més detalls'),
];

export default function TruckList({ onTruckClick }: TruckListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleDetailsClick = (truck: Truck) => {
    onTruckClick(truck);
    navigate('/truck-details');
  };

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
      <Paper style={{ maxHeight: '300px', overflow: 'auto' }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center">Matricula</TableCell>
                <TableCell align="center">Zona de la Ruta</TableCell>
                <TableCell align="center">Parades Efectuades</TableCell>
                <TableCell align="center">Temps Promig</TableCell>
                <TableCell align="center">L Subministrats / L Totals</TableCell>
                <TableCell align="center">Incidencies</TableCell>
                <TableCell align="center">Detalls del Camió</TableCell>
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
                  <TableCell align="center">{row.Incidencies}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailsClick(row)}
                    >
                      Més detalls
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}

