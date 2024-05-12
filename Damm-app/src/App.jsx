import { Form } from './components/Form/Form'
import {Home} from './components/Home/Home'
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
