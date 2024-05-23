import React from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Correcció de la importació dels marcadors de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1995/1995526.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const TruckMap = ({ zonaRuta }) => {
  const routeCoordinatesLleidaTarragona = [
    [41.1189, 1.2445], // Bar Kentucky (Tarragona)
    [41.1196, 1.2493], // Bar Kram (Tarragona)
    [41.2858, 1.2491], // Bar El Terrat (Valls)
    [41.5793, 1.6171], // Restaurant El Llorer (Igualada)
    [41.6708, 1.2681], // Bar Cal Pep (Cervera)
    [41.6482, 1.1410], // Restaurant El Celler (Tàrrega)
    [41.6186, 0.6222], // Bar del Pla (Lleida)
    [41.6177, 0.6200], // Cafeteria Slàvia (Lleida)
  ];

  const routeCoordinatesBilbao = [
    [43.2618, -2.9266], // Café Iruña
    [43.2621, -2.9274], // La Viña del Ensanche
    [43.2622, -2.9320], // Bar El Globo
    [43.2605, -2.9252], // Café Bar Bilbao
    [43.2596, -2.9233], // Bar Restaurante Sorginzulo
    [43.2635, -2.9253], // El Huevo Frito
    [43.2648, -2.9302], // Café Bar Las Torres
  ];

  const truckPositionLleidaTarragona = [41.2858, 1.2491]; // Posició actual del camió a Lleida-Tarragona
  const truckPositionBilbao = [43.2622, -2.9320]; // Posició actual del camió a Bilbao

  const routeCoordinates = zonaRuta === 'Lleida - Tarragona' ? routeCoordinatesLleidaTarragona : routeCoordinatesBilbao;
  const truckPosition = zonaRuta === 'Lleida - Tarragona' ? truckPositionLleidaTarragona : truckPositionBilbao;

  const iconTruck = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>Mapa de la ruta</Typography>
      <MapContainer center={truckPosition} zoom={10} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routeCoordinates.map((position, idx) => (
          <Marker key={idx} position={position} icon={iconTruck}>
            <Popup>Parada {idx + 1}</Popup>
          </Marker>
        ))}
        <Polyline positions={routeCoordinates.slice(0, 3)} color="orange" />
        <Polyline positions={routeCoordinates.slice(2)} color="blue" />
        <Marker position={truckPosition} icon={truckIcon}>
          <Popup>Posició actual del camió</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default TruckMap;
