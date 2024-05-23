import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const dataTemperatureLleidaTarragona = [
  { time: '13:00', Tanc1: 4.1, Tanc2: 3.8 },
  { time: '14:00', Tanc1: 4.2, Tanc2: 3.9 },
  { time: '15:00', Tanc1: 4.3, Tanc2: 4.0 },
  { time: '16:00', Tanc1: 4.0, Tanc2: 3.7 },
  { time: '17:00', Tanc1: 4.1, Tanc2: 3.8 },
  { time: '18:00', Tanc1: 4.2, Tanc2: 3.9 },
];

const dataTemperatureBilbao = [
  { time: '13:00', Tanc1: 3.5, Tanc2: 3.6 },
  { time: '14:00', Tanc1: 3.4, Tanc2: 3.7 },
  { time: '15:00', Tanc1: 3.5, Tanc2: 3.5 },
  { time: '16:00', Tanc1: 3.7, Tanc2: 3.4 },
  { time: '17:00', Tanc1: 3.5, Tanc2: 3.3 },
  { time: '18:00', Tanc1: 3.4, Tanc2: 3.5 },
];

const dataBeerTank1LleidaTarragona = [{ name: 'Restant (L)', value: 540 }, { name: 'Gastat (L)', value: 460 }];
const dataBeerTank2LleidaTarragona = [{ name: 'Restant (L)', value: 1000 }, { name: 'Gastat (L)', value: 0 }];
const dataBeerTank1Bilbao = [{ name: 'Restant (L)', value: 0 }, { name: 'Gastat (L)', value: 1000 }];
const dataBeerTank2Bilbao = [{ name: 'Restant (L)', value: 700 }, { name: 'Gastat (L)', value: 300 }];
const COLORS = ['#0088FE', '#FF8042'];

const TruckCharts = ({ zonaRuta }) => {
  const dataTemperature = zonaRuta === 'Lleida - Tarragona' ? dataTemperatureLleidaTarragona : dataTemperatureBilbao;
  const dataBeerTank1 = zonaRuta === 'Lleida - Tarragona' ? dataBeerTank1LleidaTarragona : dataBeerTank1Bilbao;
  const dataBeerTank2 = zonaRuta === 'Lleida - Tarragona' ? dataBeerTank2LleidaTarragona : dataBeerTank2Bilbao;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>Representació gràfica</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography align="center" variant="subtitle1" gutterBottom>Litres de cervesa que transporta el camió</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataBeerTank1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {dataBeerTank1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Typography align="center">Tanc 1</Typography>
            </Grid>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataBeerTank2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                    {dataBeerTank2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Typography align="center">Tanc 2</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography align="center" variant="subtitle1" gutterBottom>Evolució de les temperatures dels tancs de cervesa</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataTemperature} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" label={{ value: 'Hora', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Temperatura (ºC)', angle: -90, position: 'insideLeft' }} domain={zonaRuta === 'Lleida - Tarragona' ? [3, 4.5] : [3, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Tanc1" stroke="#8884d8" />
              <Line type="monotone" dataKey="Tanc2" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TruckCharts;
