import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import "./tareas.css"
import Navbar from "../../components/navbar"
import { useNavigate } from "react-router-dom"
import api from '../../services/api'
import { autenticado } from "../../services/auth"
import { userId } from "../../services/auth"

// Iconos SVG reutilizados
const EditIcon = () => (
  <svg className="edit-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

export default function Tareas() {

  const [tareas, setTareas] = useState([])
  const [materias, setMateria] = useState([])
  const navigate = useNavigate()
  const id_usuario = userId()
  const [busquedaTarea, setBusquedaTarea] = useState("");

  useEffect(() => {
    if (!autenticado()) {
      navigate('/login')
      return
    }

    cargarMaterias()
    listarTareas()
  }, [navigate])

  const CrearTarea = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Tarea",
      html: `
        <select id="id-materia" class="swal2-input">
          ${materias.map(m => `<option value="${m.id}">${m.nombre_materia}</option>`).join("")}
        </select>
        
        <input id="nombre-tarea" class="swal2-input" placeholder="Nombre de la tarea">
        <input id="fecha-tarea" class="swal2-input" type="date">
        
        <select id="estado-tarea" class="swal2-input">
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="realizado">Realizado</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const id_materia = document.getElementById("id-materia").value
        const nombre_tarea = document.getElementById("nombre-tarea").value
        const fecha = document.getElementById("fecha-tarea").value
        const estado = document.getElementById("estado-tarea").value

        if (!id_materia || !nombre_tarea || !fecha || !estado) {
          Swal.showValidationMessage("Todos los campos son obligatorios")
          return
        }

        const fechaISO = new Date(fecha).toISOString()

        return {
          id_materia,
          nombre_tarea,
          fecha_creacion: fechaISO,
          estado
        }
      }
    })

    if (!formValues) return

    console.log("FORM VALUES:", formValues)

    try {
      const res = await api.post(
        `/crearTarea/${formValues.id_materia}`,
        {
          nombre_tarea: formValues.nombre_tarea,
          fecha_creacion: formValues.fecha_creacion,
          estado: formValues.estado
        }
      )

      setTareas(prev => [...prev, res.data.tarea])

      Swal.fire("Tarea Creada", "La tarea se ha creado correctamente", "success")
    } catch (error) {
      console.error(error)
      Swal.fire("Error", "No se pudo crear la tarea", "error")
    }
  }

  const cargarMaterias = async () => {
    try {
      const res = await api.get(`/listarMaterias/${id_usuario}`)
      setMateria(res.data.materias)
    } catch (error) {
      console.log("No se han encontrado materias")
    }
  }

  const listarTareas = async () => {
    try {
      const res = await api.get(`/listarTarea/${id_usuario}`)
      setTareas(res.data.tareas)
    } catch (error) {
      console.log(error)
      Swal.fire("Error", "No se pudieron encontrar tareas", "error")
    }
  }

  const filtrarTareas = tareas.filter((tarea) =>
    tarea.nombre_tarea.toLowerCase().includes(busquedaTarea.toLowerCase())
  );

  const SearchIcon = () => (
    <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )

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
          <div className="search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar"
              value={busquedaTarea}
              onChange={(e) => setBusquedaTarea(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="tareas-grid">
          {filtrarTareas.map((tarea) => (
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

        <div className="create-button-container">
          <button className="create-button" onClick={CrearTarea}>
            Crear tarea
          </button>
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
