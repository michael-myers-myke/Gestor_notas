import { Routes, Route } from 'react-router-dom';
import Registro from './pages/login/registro';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Materias from './pages/materias/materias';
import MateriasDeshabilitadas from './pages/materias/materiasDeshabilitadas';

function AppRouter() {
    return (
        <Routes>
            <Route path="/registro" element={<Registro />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dashboard" element={< Dashboard/>}></Route>
            <Route path="/materias" element={< Materias/>}></Route>
            <Route path="/materiasDeshabilitadas" element={< MateriasDeshabilitadas/>}></Route>
        </Routes>
    )
}

export default AppRouter;

