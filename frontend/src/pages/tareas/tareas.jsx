
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import "./tareas.css"
import Navbar from "../../components/navbar"
import { useNavigate } from "react-router-dom"
import api from '../../services/api'
import { autenticado } from "../../services/auth"

// Iconos SVG reutilizados
const EditIcon = () => (
  <svg className="edit-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

export default function Tareas() {

  const [tareas, setTareas] = useState([]);
  const [materia, setMateria] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autenticado()) {
      navigate('/login');
      return
    }

    cargarMaterias();
    listarMaterias();
  }, [navigate]);

  const CrearTarea = async () => {
    const { values: formValues } = await Swal.fire({
      title: "Crear Tarea",
      html: `
      <select id="select-maeteria" class="swal2-input">
      ${materia}`
    })
    try {

    } catch (error) {

    }
  }
  const cargarMaterias = async () => {
    try {
      const res = await api.get(`/listarMaterias/${id_usuario}`);

      setMateria(res.data.materia);
    } catch (error) {
      console.error(error);
      console.log("No se han encontrado materias para el usuario");
    }
  }
  const listarMaterias = async () => {
    try {
      const res = await api.get(`/Listartareas/${id_usuario}`)

      setTareas(res.data.tareas);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron encontrar tareas creadas para el usuario",
        "error"
      );
    }
  };
  return (
    <div className="tareas-page">
      <Navbar
      // activeNav={activeNav}
      // setActiveNav={setActiveNav}
      // searchTerm={searchTerm}
      // setSearchTerm={setSearchTerm}
      />
      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Tareas</h1>

        <div className="section-header">
          <h2 className="section-title">Tus Tareas creadas</h2>
          <button className="create-task-button" onClick={CrearTarea}>
            Crear tarea
          </button>
        </div>

        {filteredTareas.length > 0 ? (
          <div className="tareas-grid">
            {filteredTareas.map((tarea) => (
              <div key={tarea.id} className={`tarea-card ${!tarea.enabled ? "disabled" : ""}`}>
                <div className="card-header">
                  <h3 className="card-title">{tarea.materia}</h3>
                  <button
                    className="edit-button"
                    onClick={() => handleEditTask(tarea.id)}
                    aria-label={`Editar tarea de ${tarea.materia}`}
                  >
                    <EditIcon />
                  </button>
                </div>

                <div className="card-content">
                  <div className="task-item">
                    <div className="bullet"></div>
                    <span className="task-text">{tarea.task}</span>
                  </div>

                  <div className="date-info">
                    <div>fecha de creacion: {tarea.creationDate}</div>
                  </div>

                  <div className="date-info">
                    <div>Fecha de expiracion: {tarea.expirationDate}</div>
                  </div>
                </div>

                <div className="card-actions">
                  <div className="status-section">
                    <div className="status-label">Estado:</div>
                    <button
                      className={`status-button status-${tarea.status}`}
                      onClick={() => handleStatusClick(tarea.id, tarea.status)}
                      disabled={!tarea.enabled}
                    >
                      {tarea.statusText}
                    </button>
                  </div>

                  <button
                    className="disable-button"
                    onClick={() => handleDisableTask(tarea.id)}
                    disabled={loadingStates[tarea.id]}
                  >
                    {loadingStates[tarea.id] ? "Procesando..." : tarea.enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No se encontraron tareas</h3>
            <p>{searchTerm ? `No hay tareas que coincidan con "${searchTerm}"` : "Aún no has creado ninguna tarea"}</p>
          </div>
        )}
      </main>
    </div>
  )
}
