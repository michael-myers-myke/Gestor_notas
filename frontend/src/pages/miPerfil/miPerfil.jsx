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

                <div className="main-content">
                    <div className="card">
                        <h3>Bienvenido!</h3>
                        <p></p>
                    </div>
                </div>
            </main>
        </div>
    )
}