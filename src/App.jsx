import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'
import Navbar from './components/Navbar'
//bhai yeh apne same hogayi App.js walli file no problem here .
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Navbar/>
          <Todo/>
    </>
  )
}

export default App
