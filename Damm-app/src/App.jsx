import { Form } from './components/Form/Form'
import {Home} from './components/Home/Home'
import {useState} from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState("")

  return (
    <div className="App">
            {user ? <Home /> : <Form setUser={setUser} />}
        </div>
  )
}

export default App
