import { Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import AuthLayout from './layout/AuthLayout';
import Register from './pages/Register';
function App() {

  return (
    <Routes>
      <Route element={<AuthLayout/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='register'  element={<Register/>}/>
      </Route>
    </Routes>
  )
}

export default App
