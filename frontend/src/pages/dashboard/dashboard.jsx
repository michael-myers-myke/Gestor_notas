import { useState } from "react"
import { useEffect } from "react"
import "./dashboard.css"
import { useNavigate } from "react-router-dom"
import { userId } from "../../services/auth"
import { autenticado } from "../../services/auth"
import api from "../../services/api"
import Navbar from "../../components/navbar"  

import Swal from "sweetalert2"

// Iconos SVG como componentes
const EditIcon = () => (
  <svg className="edit-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

export default function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();
  const id_usuario = userId()

  useEffect(() => {
    if (!autenticado()) {
      navigate('/login')
      return
    }
    listarTareas()
  }, [navigate]);

  const listarTareas = async () => {
    try { 
      const res = await api.get(`/listarTarea/${id_usuario}`)
      setTareas(res.data.tareas)
    } catch (error) {
      // console.log(error);
      Swal.fire("Error", "No se encontraron Tareas", "error");
    }
  }
  
  return (
      <div className="tareas-page">
        <Navbar />
        <main className="main-content">
          <h1 className="page-title">Tareas</h1>
  
          <div className="section-header">
            <h2 className="section-title">Tus Tareas creadas</h2>
            {/* <button className="create-task-button" onClick={CrearTarea}>
              Crear tarea
            </button> */}
            {/* <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar"
                value={busquedaTarea}
                onChange={(e) => setBusquedaTarea(e.target.value)}
                className="search-input"
              />
            </div> */}
          </div>
  
          <div className="tareas-grid">
            {tareas.map((tarea) => (
              <div key={tarea.id} className="tarea-card">
                <div className="card-header">
                  <h3 className="card-title">{tarea.nombre_tarea}</h3>
                  <EditIcon />
                </div>
  
                <div className="card-content">
                  <div>Fecha creación: {new Date(tarea.fecha_creacion).toLocaleDateString()}</div>
                  <div>Estado: {tarea.estado}</div>
                </div>
              </div>
            ))}
          </div>
        
        
          {tareas.length === 0 && (
            <div className="empty-state"> 
              <h3>No se encontraron tareas</h3>
            </div>
          )}
        </main>
      </div>
    )
  }
  