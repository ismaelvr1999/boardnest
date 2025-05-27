import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layout/authLayout';
import Register from './pages/register';
import Login from './pages/login';
import { AuthProvider } from './features/auth/context/authContext';
import ProtectedRouters from './components/protectedRouters';
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register'  element={<Register/>}/>
        </Route>
        <Route element={<ProtectedRouters/>}>
            <Route path='boards' element={<h1 className='text-white'>Welcome to Boardnest</h1>}/>
        </Route>
      </Routes>
    </AuthProvider>)
}

export default App
