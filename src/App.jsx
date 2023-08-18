import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'
import Navbar from './components/Navbar'
import NoteState from './context/notes/notesState';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//bhai yeh apne same hogayi App.js walli file no problem here .
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NoteState>
          <Router>
          <Navbar/>
          {/* <Todo/> */}
          <Routes>
          <Route exact path='/' element={<Home/>} />
          </Routes>
          </Router>
          </NoteState>
    </>
  )
}

export default App
