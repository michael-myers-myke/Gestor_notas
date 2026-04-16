import "./miPerfil.css";
import Navbar from "../../components/navbar"
import { useEffect, useState } from "react";
import { userId } from "../../services/auth";
import { autenticado } from "../../services/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function MiPerfil() {
    const [usuario, setUsuario] = useState("");
    const id_usuario = userId();
    const navigate = useNavigate();

    useEffect(() => {
        if (!autenticado) {
            navigate("/login");
            return;
        }

        ObtenerUsuario();
    }, [navigate]);

    const editarUsuario = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Editar Perfil",
            html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${usuario?.nombre || ""}" />
            <input id="swal-email" class="swal2-input" placeholder="Correo" value="${usuario?.email || ""}" />
        `,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const nombre = document.getElementById("swal-nombre").value;
                const email = document.getElementById("swal-email").value;

                if (!nombre) {
                    Swal.showValidationMessage("El nombre es obligatorio");
                    return;
                }

                if (!email) {
                    Swal.showValidationMessage("El correo es obligatorio");
                    return;
                }

                return { nombre, email };
            }
        });

        if (!formValues) return;

        try {
            const res = await api.put(`/actualizarUsuario/${id_usuario}`, {
                nombre: formValues.nombre,
                email: formValues.email
            });

            setUsuario(res.data.usuario);

            Swal.fire("Actualizado", "Perfil actualizado correctamente", "success");

        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el usuario", "error");
        }
    };

    const ObtenerUsuario = async () => {
        try {
            const res = await api.get(`/listarUsuarios/${id_usuario}`);
            setUsuario(res.data.usuario);
        } catch (error) {
            console.error("Hubo un problema al obtener el usuario");
        }
    }




    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                {/* Page Title */}
                <h1 className="page-title">Tareas</h1>

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="avatar-section">
                        <div className="avatar">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="80"
                                height="80"
                            >
                                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                            </svg>
                        </div>
                    </div>

                    <hr className="card-divider" />

                    <div className="profile-info">
                        <div className="info-row">
                            <span className="info-label">Nombre Usuario:</span>
                            <span className="info-value">{usuario?.nombre}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Correo electronico:</span>
                            <a href="mailto:michael@gmail.com" className="info-value email">
                                {usuario?.email}
                            </a>
                        </div>

                        <button className="edit-button" onClick={editarUsuario}>Editar</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
