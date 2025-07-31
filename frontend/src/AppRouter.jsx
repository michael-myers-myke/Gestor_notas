import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from './pages/login/registro';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Materias from './pages/materias/materias';
import MateriasDeshabilitadas from './pages/materias/materiasDeshabilitadas';
import Tareas from './pages/tareas/tareas';
import TareasDeshbilitadas from './pages/tareas/tareasDeshabilitadas';

function AppRouter() {
    return (
        <Routes>
            <Route path="/registro" element={<Registro />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dashboard" element={< Dashboard/>}></Route>
            <Route path="/materias" element={< Materias/>}></Route>
            <Route path="/materiasDeshabilitadas" element={< MateriasDeshabilitadas/>}></Route>
            <Route path="/tareas" element={< Tareas/>}></Route>
            <Route path="/tareasDeshabilitadas" element={< TareasDeshbilitadas/>}></Route>
        </Routes>
    )
}

export default AppRouter;

