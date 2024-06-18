import React, { useState } from 'react';
import { Container, Typography, Paper, Box, CssBaseline, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MobileTruckCharts from './MobileTruckCharts';
import MobileTruckMap from './MobileTruckMap';
import MobileTruckStops from './MobileTruckStops';
import { useNavigate } from 'react-router-dom';
import './Mobile.css'; // Importar el fitxer CSS

const theme = createTheme({
  typography: {
    fontSize: 12, // Reduir la mida de la lletra
  },
});

const MobileTruckDetails = () => {
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentText, setIncidentText] = useState('');
  const navigate = useNavigate();

  const stops = [
    { name: "Covenant (Vilanova i la Geltru)", liters: 1375 },
    { name: "Gala Urban Food s.l (Vilanova i la Geltru)", liters: 1141 },
    { name: "Colegio Fundación Llor (Sant Boi de Llobregat)", liters: 938 },
    { name: "Eusebio 3 (Barcelona)", liters: 1334 },
  ];

  const handleCreateIncident = () => {
    setShowIncidentForm(true);
  };

  const handleConfirmIncident = () => {
    console.log("Incidència confirmada:", incidentText);
    // Aquí pots afegir el codi per guardar la incidència o enviar-la a un servidor
    setShowIncidentForm(false);
    setIncidentText('');
  };

  const handleClose = () => {
    navigate('/home'); // Redirigir a la pantalla de Home
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="smartphone">
        <div className="screen">
          <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'auto' }}>
            <CssBaseline />
            <Container maxWidth="xs" sx={{ mt: 2, mb: 2 }}>
              <Paper sx={{ p: 1 }}>
                <Button className="close-button" onClick={handleClose}>
                  &times;
                </Button>
                <MobileTruckMap zonaRuta="Barcelona" />
                <MobileTruckStops stops={stops} />
                <MobileTruckCharts zonaRuta="Barcelona" />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleCreateIncident}
                >
                  Crea incidència
                </Button>
                {showIncidentForm && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Descripció de la incidència"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      value={incidentText}
                      onChange={(e) => setIncidentText(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handleConfirmIncident}
                    >
                      Confirmar incidència
                    </Button>
                  </Box>
                )}
              </Paper>
            </Container>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MobileTruckDetails;
