import { LoginForm } from './screens/Login/LoginForm'
import {Home} from './screens/Home/Home'
import {useState} from 'react'
import './App.css'
import {ParadaManual} from "./screens/ParadaManual/ParadaManual.jsx";
import AppLayout from "./components/AppLayout.jsx";

function App() {

  const [user, setUser] = useState("")

  return (
    <div className="App">
        <AppLayout>
            <ParadaManual/>
        </AppLayout>
        </div>
  )
}

export default App
