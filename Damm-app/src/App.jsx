import { LoginForm } from './screens/Login/LoginForm'
import {Home} from './screens/Home/Home'
import {useState} from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState("")

  return (
    <div className="App">
            {user ? <Home /> : <LoginForm setUser={setUser} />}
        </div>
  )
}

export default App
