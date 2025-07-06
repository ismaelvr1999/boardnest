import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/layout';
import Register from './pages/register';
import Login from './pages/login';
import { AuthProvider } from './features/auth/context/authContext';
import ProtectedRouters from './components/protectedRouters';
import Boards from './pages/boards';
import Board from './pages/board';
import { BoardProvider } from './features/board/boardContext';
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout/>}>
           {/* Auth routers */}
          <Route path='/' element={<Login/>}/>
          <Route path='register'  element={<Register/>}/>
          {/* ProtectedRouters */}
          <Route element={<ProtectedRouters/>}>
            <Route path='boards'> 
              <Route index element={<Boards/>}/>
              <Route element={<BoardProvider/>}>
                <Route path=':id' element={<Board />}/>
              </Route >
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>)
}

export default App
