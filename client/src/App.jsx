import { useState } from 'react'
import './App.css'
import { Routes,Route,Navigate} from 'react-router'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Accounts from './pages/Accounts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <>
      <Routes>
        <Route element = {<Layout/>}>
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
                />
                 <Route
                    path="/"
                    element={<Navigate to={"/login"} replace/>}
                />

                <Route
                    path="/transactions"
                    element={<ProtectedRoute><Transactions/></ProtectedRoute>}
                />

                <Route
                    path="/budgets"
                    element={<ProtectedRoute><Budgets/></ProtectedRoute>}
                />

                <Route
                    path="/reports"
                    element={<ProtectedRoute><Reports/></ProtectedRoute>}
                />
                                <Route
                    path="/accounts"
                    element={<ProtectedRoute><Accounts/></ProtectedRoute>}
                />

                
                <Route
                    path="/settings"
                    element={<ProtectedRoute><Settings/></ProtectedRoute>}
                />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>

      </Routes>
      
    </>
    
  )
}

export default App
