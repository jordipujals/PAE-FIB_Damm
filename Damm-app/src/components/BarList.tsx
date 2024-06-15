// BarList.tsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { usePapaParse } from 'react-papaparse';

interface Location {
  id: string;
  name: string;
  province: string;
  city: string;
  litDem: string;
  billingLatitude: string;
  billingLongitude: string;
  obertura: string;
  tancament: string;
  status?: string;
  postalCode?: string;
  idSAP?: string;
  distributor?: string;
  type?: string;
}

interface BarListProps {
  selectedProvince: string;
  setFilteredBars: (bars: Location[]) => void;
}

const BarList: React.FC<BarListProps> = ({ selectedProvince, setFilteredBars }) => {
  const [bars, setBars] = useState<Location[]>([]);
  const { readRemoteFile } = usePapaParse();

  useEffect(() => {
    readRemoteFile('/LlistatLocals.csv', {
      header: true,
      download: true,
      complete: (results: any) => {
        const data = results.data.map((row: any) => ({
          id: row.ID,
          name: row.NAME,
          province: row.STATE,
          city: row.CITY,
          billingLatitude: row.BILLINGLATITUDE,
          billingLongitude: row.BILLINGLONGITUDE,
          litDem: row.LITDEM,
          obertura: row.OBERTURA,
          tancament: row.TANCAMENT,
          status: row.STATUS,
          postalCode: row.POSTALCODE,
          idSAP: row.IDSAP,
          distributor: row.DISTRIBUTOR,
          type: row.TYPE,
        }));

        const sortedData = data.sort((a: Location, b: Location) => a.province.localeCompare(b.province));
        setBars(sortedData);
      },
    });
  }, [readRemoteFile]);

  useEffect(() => {
    const filteredBars = selectedProvince
      ? bars.filter(bar => bar.province === selectedProvince)
      : bars;
    setFilteredBars(filteredBars);
  }, [selectedProvince, bars, setFilteredBars]);

  const displayedBars = selectedProvince
    ? bars.filter(bar => bar.province === selectedProvince)
    : bars;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom del bar</TableCell>
            <TableCell>Província</TableCell>
            <TableCell>Ciutat</TableCell>
            <TableCell>Litres de cervesa sol·licitats</TableCell>
            <TableCell>Horari</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedBars.map((bar) => (
            <TableRow key={bar.id}>
              <TableCell>{bar.name}</TableCell>
              <TableCell>{bar.province}</TableCell>
              <TableCell>{bar.city}</TableCell>
              <TableCell>{bar.litDem}</TableCell>
              <TableCell>{bar.obertura}-{bar.tancament}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BarList;
