import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layout/authLayout';
import Register from './pages/register';
import Login from './pages/login';
import { AuthProvider } from './contexts/authContext';
function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route element={<AuthLayout/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='register'  element={<Register/>}/>
      </Route>
    </Routes>
    </AuthProvider>)

}

export default App
