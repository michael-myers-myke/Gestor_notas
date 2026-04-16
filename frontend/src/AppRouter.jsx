import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from './pages/login/registro';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Materias from './pages/materias/materias';
import Tareas from './pages/tareas/tareas';
import TareasDeshbilitadas from './pages/tareas/tareasDeshabilitadas';
import MiPerfil from "./pages/miPerfil/miPerfil";

function AppRouter() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login"/>}></Route>
            <Route path="/registro" element={<Registro />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dashboard" element={< Dashboard/>}></Route>
            <Route path="/materias" element={< Materias/>}></Route>
            <Route path="/tareas" element={< Tareas/>}></Route>
            <Route path="/tareasDeshabilitadas" element={< TareasDeshbilitadas/>}></Route>
            <Route path="/perfil" element={< MiPerfil/>}></Route>
        </Routes>
    )
}

export default AppRouter;

