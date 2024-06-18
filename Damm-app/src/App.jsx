import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { LoginForm } from './screens/Login/LoginForm';
import { Home } from './screens/Home/Home';
import TruckDetails from './screens/TruckDetails/TruckDetails';
import NewRoute from './screens/NewRoute/NewRoute';
import RouteDetail from './screens/NewRoute/RouteDetail';
import NewStop from './screens/NewStop/NewStop';
import MobileLogin from './screens/Smartphone/MobileLogin'; 
import MobileTruckDetails from './screens/Smartphone/MobileTruckDetails'; 
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirigir a Login si no hi ha sessió activa
    }
  }, [user, navigate]);

  const handleLogin = (username) => {
    setUser(username);
    navigate('/home'); // Redirigir a Home després del login
  };

  const handleMobileLogin = (username) => {
    setUser(username);
    navigate('/mobile-truck-details'); // Redirigir a MobileTruckDetails després del login mòbil
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm setUser={handleLogin} />} />
        <Route path="/mobile-login" element={<MobileLogin setUser={handleMobileLogin} />} />
        {user && (
          <>
            <Route path="/home" element={<Home setSelectedTruck={setSelectedTruck} />} />
            <Route path="/truck-details" element={<TruckDetails truck={selectedTruck} />} />
            <Route path="/new-route" element={<NewRoute />} />
            <Route path="/route-detail/:id" element={<RouteDetail />} />
            <Route path="/new-stop" element={<NewStop />} />
            <Route path="/mobile-truck-details" element={<MobileTruckDetails />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
