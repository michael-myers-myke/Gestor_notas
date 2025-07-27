import { Routes, Route } from 'react-router-dom';
import Registro from './pages/login/registro';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';

function AppRouter() {
    return (
        <Routes>
            <Route path="/registro" element={<Registro />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dashboard" element={< Dashboard/>}></Route>
        </Routes>
    )
}

export default AppRouter;

