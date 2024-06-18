import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const dataTemperatureBarcelona = [
  { time: '04:00', Tanc: 4.1 },
  { time: '05:00', Tanc: 4.2 },
  { time: '06:00', Tanc: 4.3 },
  { time: '07:00', Tanc: 4.0 },
  { time: '08:00', Tanc: 4.1 },
  { time: '09:00', Tanc: 4.2 },
];

const dataTemperatureBilbao = [
  { time: '13:00', Tanc: 3.5 },
  { time: '14:00', Tanc: 3.4 },
  { time: '15:00', Tanc: 3.5 },
  { time: '16:00', Tanc: 3.7 },
  { time: '17:00', Tanc: 3.5 },
  { time: '18:00', Tanc: 3.4 },
];

const dataBeerTankBarcelona = [{ name: 'Restant (L)', value: 2484 }, { name: 'Gastat (L)', value: 2516 }];
const dataBeerTankBilbao = [{ name: 'Restant (L)', value: 0 }, { name: 'Gastat (L)', value: 5000 }];
const COLORS = ['#0088FE', '#FF8042'];

const MobileTruckCharts = ({ zonaRuta }) => {
  const dataTemperature = zonaRuta === 'Barcelona' ? dataTemperatureBarcelona : dataTemperatureBilbao;
  const dataBeerTank = zonaRuta === 'Barcelona' ? dataBeerTankBarcelona : dataBeerTankBilbao;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>Estat del tanc</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography align="center" variant="subtitle1" gutterBottom>Litres de cervesa que transporta el camió</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dataBeerTank} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {dataBeerTank.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography align="center" variant="subtitle1" gutterBottom>Evolució de la temperatura del tanc de cervesa</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataTemperature} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" label={{ value: 'Hora', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Temperatura (ºC)', angle: -90, position: 'insideLeft' }} domain={[3, 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Tanc" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MobileTruckCharts;
