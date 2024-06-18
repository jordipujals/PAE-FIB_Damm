import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

// Correcció de la importació dels marcadors de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
});

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const currentStopIndex = 2; // Índex de la parada actual

const TruckMap = ({ zonaRuta }) => {
  const routeCoordinatesBarcelona = [
    [41.219197, 1.705713], // COVENANT, BARCELONA, VILANOVA I LA GELTRU
    [41.237603, 1.729729], // GALA URBAN FOOD S.L, BARCELONA, VILANOVA I LA GELTRU
    [41.357524, 2.028776], // COLEGIO FUNDACIÓN LLOR,BARCELONA,SANT BOI DE LLOBREGAT
    [41.37424, 2.168958], // Eusebio 3, Barcelona
  ];

  const routeCoordinatesBilbao = [
    [43.2618, -2.9266], // Café Iruña
    [43.2621, -2.9274], // La Viña del Ensanche
    [43.2622, -2.9320], // Bar El Globo
    [43.2605, -2.9252], // Café Bar Bilbao
  ];

  const truckPositionBarcelona = [41.251516, 1.785455]; // Posició actual del camió a Barcelona entre les parades 2 i 3
  const truckPositionBilbao = [43.26215, -2.9295]; // Posició actual del camió a Bilbao entre les parades 2 i 3

  const routeCoordinates = zonaRuta === 'Barcelona' ? routeCoordinatesBarcelona : routeCoordinatesBilbao;
  const truckPosition = zonaRuta === 'Barcelona' ? truckPositionBarcelona : truckPositionBilbao;

  const RoutingMachine = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: waypoints,
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`
        }),
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }],
        },
        createMarker: (i, waypoint, n) => {
          if (i === currentStopIndex) {
            return L.marker(waypoint.latLng, { icon: selectedIcon }).bindPopup(`Parada ${i + 1}`);
          } else if (i < currentStopIndex) {
            return L.marker(waypoint.latLng, { icon: orangeIcon }).bindPopup(`Parada ${i + 1}`);
          } else {
            return L.marker(waypoint.latLng).bindPopup(`Parada ${i + 1}`);
          }
        },
        fitSelectedRoutes: true,
        showAlternatives: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        show: false,
        collapsible: true
      }).addTo(map);

      // Remove the leaflet-routing-container class from the DOM
      const routingContainer = document.querySelector('.leaflet-routing-container');
      if (routingContainer) {
        routingContainer.style.display = 'none';
      }

      return () => map.removeControl(routingControl);
    }, [map, waypoints]);

    return null;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>Mapa de la ruta</Typography>
      <MapContainer center={truckPosition} zoom={10} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine waypoints={routeCoordinates.map(coord => L.latLng(coord[0], coord[1]))} />
        {routeCoordinates.map((position, idx) => (
          <Marker key={idx} position={position} icon={idx === currentStopIndex ? selectedIcon : (idx < currentStopIndex ? orangeIcon : defaultIcon)}>
            <Popup>Parada {idx + 1}</Popup>
          </Marker>
        ))}
        <Marker position={truckPosition} icon={truckIcon}>
          <Popup>Posició actual del camió</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default TruckMap;
