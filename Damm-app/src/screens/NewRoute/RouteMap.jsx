// RouteMap.jsx
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

const RouteMap = ({ coords }) => {
  const centerPosition = coords.length > 0 ? [coords[0].lat, coords[0].lng] : [41.3851, 2.1734];

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
          return L.marker(waypoint.latLng).bindPopup(`Parada ${i + 1}`);
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
      <MapContainer center={centerPosition} zoom={10} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine waypoints={coords.map(coord => L.latLng(coord.lat, coord.lng))} />
        {coords.map((position, idx) => (
          <Marker key={idx} position={[position.lat, position.lng]}>
            <Popup>Parada {idx + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default RouteMap;
