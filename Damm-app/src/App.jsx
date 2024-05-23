import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginForm } from './screens/Login/LoginForm';
import { Home } from './screens/Home/Home';
import TruckDetails from './screens/TruckDetails/TruckDetails';
import NewRoute from './screens/NewRoute/NewRoute';
import { ParadaManual } from './screens/ParadaManual/ParadaManual';
import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (username) => {
    setUser(username);
    navigate('/home'); // Redirigir a Home després del log-in
  };

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/home" element={<Home setSelectedTruck={setSelectedTruck} />} />
          <Route path="/truck-details" element={<TruckDetails truck={selectedTruck} />} />
          <Route path="/new-route" element={<NewRoute />} />
          <Route path="/manual-stop" element={<ParadaManual />} />
        </Routes>
      ) : (
        <LoginForm setUser={handleLogin} />
      )}
    </div>
  );
}

export default App;
