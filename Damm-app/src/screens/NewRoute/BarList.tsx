import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

export const bars = [
  { name: 'Bar Central', province: 'Barcelona' },
  { name: 'La Terraza', province: 'Madrid' },
  { name: 'El Rincón', province: 'València' },
  { name: 'Cerveseria Girona', province: 'Girona' },
  { name: 'Bar La Palma', province: 'Tarragona' },
  { name: 'Restaurant Alacant', province: 'Alacant' },
  { name: 'Bar Málaga', province: 'Màlaga' },
  { name: 'Restaurant Sevilla', province: 'Sevilla' },
  { name: 'Bar Salamanca', province: 'Salamanca' },
  { name: 'Bar Burgos', province: 'Burgos' },
  { name: 'Aromes de la Terra', province: 'Girona' },
  { name: 'Bar León', province: 'León' },
  { name: 'Cerveseria Tarragona', province: 'Tarragona' },
  { name: 'Restaurant La Rioja', province: 'La Rioja' },
  { name: 'Bar Navarra', province: 'Navarra' },
  { name: 'Bar Granada', province: 'Granada' },
  { name: 'Restaurant València', province: 'València' },
  { name: 'Bar Madrid', province: 'Madrid' },
  { name: 'Restaurant A Coruña', province: 'A Coruña' },
  { name: 'Bar Pontevedra', province: 'Pontevedra' },
  { name: 'Restaurant Lleida', province: 'Lleida' },
  { name: 'Bar Saragossa', province: 'Saragossa' },
  { name: 'Bar Huelva', province: 'Huelva' },
  { name: 'Restaurant Cantàbria', province: 'Cantàbria' },
  { name: 'Bar Melilla', province: 'Melilla' },
  { name: 'Bar Àlaba', province: 'Àlaba' },
  { name: 'Restaurant Palència', province: 'Palència' },
  { name: 'Bar Múrcia', province: 'Múrcia' },
  { name: 'Restaurant Toledo', province: 'Toledo' },
  { name: 'Bar Guadalajara', province: 'Guadalajara' },
  { name: 'Restaurant Càceres', province: 'Càceres' },
  { name: 'Bar Badajoz', province: 'Badajoz' },
  { name: 'Restaurant Alacant', province: 'Alacant' },
];

interface BarListProps {
  selectedBars: string[];
  setSelectedBars: (bars: string[]) => void;
}

const BarList: React.FC<BarListProps> = ({ selectedBars, setSelectedBars }) => {
  const handleToggle = (value: string) => {
    const currentIndex = selectedBars.indexOf(value);
    const newSelectedBars = [...selectedBars];

    if (currentIndex === -1) {
      newSelectedBars.push(value);
    } else {
      newSelectedBars.splice(currentIndex, 1);
    }

    setSelectedBars(newSelectedBars);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom del bar</TableCell>
            <TableCell>Província</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bars.map((bar) => (
            <TableRow key={bar.name} onClick={() => handleToggle(bar.name)}>
              <TableCell>
                <Checkbox
                  checked={selectedBars.indexOf(bar.name) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                {bar.name}
              </TableCell>
              <TableCell>{bar.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BarList;
