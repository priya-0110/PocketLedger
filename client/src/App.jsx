import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <main>
        <Sidebar/>
      </main>
      
    </>
  )
}

export default App
