import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layout/authLayout';
import Register from './pages/register';
import Login from './pages/login';
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
