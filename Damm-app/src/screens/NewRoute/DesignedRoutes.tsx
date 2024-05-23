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
    zone: 'Sevilla',
    stops: 9,
    startTime: '11:00 - 05/04/2024',
    endTime: '19:45 - 05/04/2024',
    length: '160Km',
    beerMargin: '175L'
  },
  {
    id: 3,
    plate: '4534-DGR',
    zone: 'Barcelona-Girona',
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
  {
    id: 7,
    plate: '4567-DEF',
    zone: 'Saragossa',
    stops: 6,
    startTime: '11:15 - 05/04/2024',
    endTime: '17:30 - 05/04/2024',
    length: '180Km',
    beerMargin: '170L'
  },
  {
    id: 8,
    plate: '8901-GHI',
    zone: 'Tarragona-Lleida',
    stops: 9,
    startTime: '09:45 - 05/04/2024',
    endTime: '18:00 - 05/04/2024',
    length: '250Km',
    beerMargin: '210L'
  },
  {
    id: 9,
    plate: '2345-JKL',
    zone: 'Burgos-Sòria',
    stops: 8,
    startTime: '08:30 - 05/04/2024',
    endTime: '16:00 - 05/04/2024',
    length: '230Km',
    beerMargin: '160L'
  },
  {
    id: 10,
    plate: '6789-MNO',
    zone: 'León-Zamora',
    stops: 7,
    startTime: '10:00 - 05/04/2024',
    endTime: '17:30 - 05/04/2024',
    length: '200Km',
    beerMargin: '185L'
  },
  {
    id: 11,
    plate: '1023-PQR',
    zone: 'Toledo-Guadalajara',
    stops: 6,
    startTime: '09:15 - 05/04/2024',
    endTime: '16:45 - 05/04/2024',
    length: '190Km',
    beerMargin: '170L'
  },
  {
    id: 12,
    plate: '4567-STU',
    zone: 'A Coruña-Pontevedra',
    stops: 5,
    startTime: '10:30 - 05/04/2024',
    endTime: '15:30 - 05/04/2024',
    length: '170Km',
    beerMargin: '180L'
  },
  {
    id: 13,
    plate: '8901-VWX',
    zone: 'Navarra-La Rioja',
    stops: 8,
    startTime: '09:45 - 05/04/2024',
    endTime: '17:00 - 05/04/2024',
    length: '220Km',
    beerMargin: '200L'
  },
  {
    id: 14,
    plate: '2345-YZA',
    zone: 'Salamanca-Ávila',
    stops: 9,
    startTime: '08:00 - 05/04/2024',
    endTime: '16:30 - 05/04/2024',
    length: '240Km',
    beerMargin: '210L'
  },
  {
    id: 15,
    plate: '6789-BCD',
    zone: 'Càceres-Badajoz',
    stops: 7,
    startTime: '09:00 - 05/04/2024',
    endTime: '17:30 - 05/04/2024',
    length: '210Km',
    beerMargin: '190L'
  },
  {
    id: 16,
    plate: '1023-EFG',
    zone: 'Cantàbria',
    stops: 6,
    startTime: '10:00 - 05/04/2024',
    endTime: '16:30 - 05/04/2024',
    length: '180Km',
    beerMargin: '160L'
  },
  {
    id: 17,
    plate: '4567-HIJ',
    zone: 'Huelva-Sevilla',
    stops: 10,
    startTime: '09:15 - 05/04/2024',
    endTime: '18:00 - 05/04/2024',
    length: '250Km',
    beerMargin: '200L'
  },
  {
    id: 18,
    plate: '8901-KLM',
    zone: 'Melilla',
    stops: 4,
    startTime: '11:00 - 05/04/2024',
    endTime: '15:00 - 05/04/2024',
    length: '130Km',
    beerMargin: '150L'
  },
  {
    id: 19,
    plate: '2345-NOP',
    zone: 'Girona-Lleida',
    stops: 9,
    startTime: '08:30 - 05/04/2024',
    endTime: '16:00 - 05/04/2024',
    length: '220Km',
    beerMargin: '180L'
  },
  {
    id: 20,
    plate: '6789-QRS',
    zone: 'Saragossa-Teruel',
    stops: 7,
    startTime: '10:15 - 05/04/2024',
    endTime: '17:30 - 05/04/2024',
    length: '210Km',
    beerMargin: '170L'
  },
  {
    id: 21,
    plate: '1023-TUV',
    zone: 'Valladolid-León',
    stops: 8,
    startTime: '09:45 - 05/04/2024',
    endTime: '18:00 - 05/04/2024',
    length: '240Km',
    beerMargin: '200L'
  },
  {
    id: 22,
    plate: '4567-WXY',
    zone: 'Palència-Burgos',
    stops: 6,
    startTime: '08:00 - 05/04/2024',
    endTime: '15:30 - 05/04/2024',
    length: '170Km',
    beerMargin: '160L'
  },
  {
    id: 23,
    plate: '8901-ZAB',
    zone: 'Múrcia-Alacant',
    stops: 10,
    startTime: '11:30 - 05/04/2024',
    endTime: '19:00 - 05/04/2024',
    length: '260Km',
    beerMargin: '210L'
  },
  {
    id: 24,
    plate: '2345-CDE',
    zone: 'Ceuta',
    stops: 4,
    startTime: '10:00 - 05/04/2024',
    endTime: '14:00 - 05/04/2024',
    length: '150Km',
    beerMargin: '170L'
  },
  {
    id: 25,
    plate: '6789-FGH',
    zone: 'Astúries',
    stops: 8,
    startTime: '09:15 - 05/04/2024',
    endTime: '16:30 - 05/04/2024',
    length: '220Km',
    beerMargin: '180L'
  },
  {
    id: 26,
    plate: '1023-IJK',
    zone: 'Barcelona-Tarragona',
    stops: 9,
    startTime: '10:30 - 05/04/2024',
    endTime: '18:45 - 05/04/2024',
    length: '250Km',
    beerMargin: '200L'
  },
  {
    id: 27,
    plate: '4567-LMN',
    zone: 'Albacete-Ciutat Real',
    stops: 7,
    startTime: '09:00 - 05/04/2024',
    endTime: '17:15 - 05/04/2024',
    length: '210Km',
    beerMargin: '190L'
  },
  {
    id: 28,
    plate: '8901-OPQ',
    zone: 'Àlaba-Guipúscoa',
    stops: 6,
    startTime: '10:00 - 05/04/2024',
    endTime: '16:45 - 05/04/2024',
    length: '180Km',
    beerMargin: '160L'
  },
  {
    id: 29,
    plate: '2345-RST',
    zone: 'La Rioja-Navarra',
    stops: 8,
    startTime: '09:30 - 05/04/2024',
    endTime: '17:45 - 05/04/2024',
    length: '230Km',
    beerMargin: '200L'
  },
  {
    id: 30,
    plate: '6789-UVW',
    zone: 'Salamanca-Zamora',
    stops: 9,
    startTime: '08:45 - 05/04/2024',
    endTime: '17:00 - 05/04/2024',
    length: '240Km',
    beerMargin: '210L'
  }
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
