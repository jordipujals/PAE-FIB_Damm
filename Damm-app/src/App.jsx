import { LoginForm } from './screens/Login/LoginForm'
import {Home} from './screens/Home/Home'
import {useState} from 'react'
import './App.css'
import {ParadaManual} from "./ParadaManual.jsx";

function App() {

  const [user, setUser] = useState("")

  return (
    <div className="App">
        <ParadaManual/>
        </div>
  )
}

export default App
