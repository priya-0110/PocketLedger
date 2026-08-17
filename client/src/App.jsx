import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Accounts from './pages/Accounts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
function App() {

  return (
    <>
      <Routes>
        <Route element = {<Layout/>}>
                <Route
                    path="/dashboard"
                    element={<Dashboard/>}
                />
                 <Route
                    path="/"
                    element={<Dashboard/>}
                />

                <Route
                    path="/transactions"
                    element={<Transactions/>}
                />

                <Route
                    path="/budgets"
                    element={<Budgets/>}
                />

                <Route
                    path="/reports"
                    element={<Reports/>}
                />
                                <Route
                    path="/accounts"
                    element={<Accounts/>}
                />

                
                <Route
                    path="/settings"
                    element={<Settings/>}
                />
        </Route>

      </Routes>
      
    </>
    
  )
}

export default App
