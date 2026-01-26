import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

export default function miPerfil () {
    const [usuario, setUsuario] = useState();
    const [navigate] = useNavigate();


    return (
        <div className="miPerfil-page">
            <main className="main-content">
                <h1 className="page-tittle">Mi perfil</h1>
            </main>
        </div>
    )
}