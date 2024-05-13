import { Form, LoginForm } from './components/Form/LoginForm'
import {Home} from './components/Home/Home'
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
