import "./miPerfil.css";
import Navbar from "../../components/navbar"

export default function MiPerfil() {
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
                            <span className="info-value">Michael</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Correo electronico:</span>
                            <a href="mailto:michael@gmail.com" className="info-value email">
                                michael@gmail.com
                            </a>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Rol:</span>
                            <span className="info-value">Administrador</span>
                        </div>

                        <button className="edit-button">Editar</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
