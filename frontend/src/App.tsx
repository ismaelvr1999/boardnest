import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layout/authLayout';
import Register from './pages/register';
import Login from './pages/login';
import { AuthProvider } from './features/auth/context/authContext';
import ProtectedRouters from './components/protectedRouters';
import Boards from './pages/boards';
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register'  element={<Register/>}/>
          <Route element={<ProtectedRouters/>}>
            <Route path='boards' element={<Boards/>}/>
          </Route>
        </Route>

      </Routes>
    </AuthProvider>)
}

export default App
