import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio } from '@mui/material';

export interface Route {
  id: number;
  plate: string;
  zone: string;
  stops: number;
  startTime: string;
  endTime: string;
  length: string;
  beerMargin: string;
}

interface DesignedRoutesProps {
  routes: Route[];
  selectedRoute: number | null;
  setSelectedRoute: (id: number | null) => void;
}

export const routes: Route[] = [
  {
    id: 1,
    plate: '6721-JKL',
    zone: 'València-Castelló',
    stops: 8,
    startTime: '10:15 - 05/04/2024',
    endTime: '18:30 - 05/04/2024',
    length: '215Km',
    beerMargin: '180L'
  },
  {
    id: 2,
    plate: '2894-MNP',
    zone: 'SEVILLA',
    stops: 9,
    startTime: '11:00 - 05/04/2024',
    endTime: '19:45 - 05/04/2024',
    length: '160Km',
    beerMargin: '175L'
  },
  {
    id: 3,
    plate: '4534-DGR',
    zone: 'BARCELONA',
    stops: 11,
    startTime: '12:05 - 05/04/2024',
    endTime: '17:40 - 05/04/2024',
    length: '342Km',
    beerMargin: '225L'
  },
  {
    id: 4,
    plate: '3816-RST',
    zone: 'Àlaba-Guipúscoa',
    stops: 7,
    startTime: '12:30 - 05/04/2024',
    endTime: '20:10 - 05/04/2024',
    length: '198Km',
    beerMargin: '120L'
  },
  {
    id: 5,
    plate: '5478-XYZ',
    zone: 'Madrid',
    stops: 5,
    startTime: '09:00 - 05/04/2024',
    endTime: '15:00 - 05/04/2024',
    length: '150Km',
    beerMargin: '200L'
  },
  {
    id: 6,
    plate: '1234-ABC',
    zone: 'Màlaga-Granada',
    stops: 10,
    startTime: '10:30 - 05/04/2024',
    endTime: '18:45 - 05/04/2024',
    length: '220Km',
    beerMargin: '190L'
  },

];

const DesignedRoutes: React.FC<DesignedRoutesProps> = ({ routes, selectedRoute, setSelectedRoute }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Selecciona</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Zona</TableCell>
            <TableCell>Parades</TableCell>
            <TableCell>Hora d'inici</TableCell>
            <TableCell>Hora de fi</TableCell>
            <TableCell>Longitud</TableCell>
            <TableCell>Marge de cervesa (L)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((route) => (
            <TableRow
              key={route.id}
              hover
              selected={selectedRoute === route.id}
              onClick={() => setSelectedRoute(route.id)}
            >
              <TableCell>
                <Radio
                  checked={selectedRoute === route.id}
                  onChange={() => setSelectedRoute(route.id)}
                  value={route.id}
                  name="route-selection"
                />
              </TableCell>
              <TableCell>{route.plate}</TableCell>
              <TableCell>{route.zone}</TableCell>
              <TableCell>{route.stops}</TableCell>
              <TableCell>{route.startTime}</TableCell>
              <TableCell>{route.endTime}</TableCell>
              <TableCell>{route.length}</TableCell>
              <TableCell>{route.beerMargin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DesignedRoutes;
