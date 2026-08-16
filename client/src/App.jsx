import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router'
import Layout from './components/Layout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element = {<Layout/>}>
                <Route
                    path="/dashboard"
                    element={<h1>Dashboard</h1>}
                />
                 <Route
                    path="/"
                    element={<h1>Dashboard</h1>}
                />

                <Route
                    path="/transactions"
                    element={<h1>Transactions</h1>}
                />

                <Route
                    path="/budgets"
                    element={<h1>Budgets</h1>}
                />

                <Route
                    path="/reports"
                    element={<h1>Reports</h1>}
                />
                                <Route
                    path="/accounts"
                    element={<h1>Accounts</h1>}
                />

                
                <Route
                    path="/settings"
                    element={<h1>Settings</h1>}
                />
        </Route>

      </Routes>
      
    </>
    
  )
}

export default App
