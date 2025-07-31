"use client"

import { act, useState } from "react"
import Swal from "sweetalert2"
import "./tareas.css"
import Navbar from "../../components/navbar"

// Iconos SVG reutilizados
const EditIcon = () => (
  <svg className="edit-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

export default function Tareas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeNav, setActiveNav] = useState("Tareas")
  const [loadingStates, setLoadingStates] = useState({})

  // Datos de las tareas (idénticos al mockup)
  const [tareas, setTareas] = useState([
    {
      id: "1",
      materia: "Química",
      task: "Ejercicios ley de mendel",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "en-proceso",
      statusText: "En proceso",
      enabled: true,
    },
    {
      id: "2",
      materia: "Física",
      task: "Taller 2 fisica 1",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "realizado",
      statusText: "Realizado",
      enabled: true,
    },
    {
      id: "3",
      materia: "Inglés",
      task: "Estudiar ingles",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "por-empezar",
      statusText: "Por empezar",
      enabled: true,
    },
  ])


  const handleEditTask = (taskId) => {
    const tarea = tareas.find((t) => t.id === taskId)
    console.log(`Editando tarea: ${taskId}`)
    alert(`Editando tarea "${tarea.task}" de ${tarea.materia}`)
  }

  const handleStatusClick = (taskId, currentStatus) => {
    console.log(`Cambiando estado de tarea ${taskId} desde ${currentStatus}`)

    // Ciclo de estados
    const statusCycle = {
      "por-empezar": { next: "en-proceso", text: "En proceso" },
      "en-proceso": { next: "realizado", text: "Realizado" },
      realizado: { next: "por-empezar", text: "Por empezar" },
    }

    const nextStatus = statusCycle[currentStatus]

    // Actualizar estado de la tarea
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === taskId
          ? {
              ...tarea,
              status: nextStatus.next,
              statusText: nextStatus.text,
            }
          : tarea,
      ),
    )

    // Mostrar notificación
    Swal.fire({
      title: "Estado actualizado",
      text: `La tarea ha sido marcada como: ${nextStatus.text}`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6",
      timer: 2000,
      timerProgressBar: true,
    })
  }

  const handleDisableTask = async (taskId) => {
    const tarea = tareas.find((t) => t.id === taskId)
    const action = tarea.enabled ? "deshabilitar" : "habilitar"

    const result = await Swal.fire({
      title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} tarea?`,
      text: `¿Estás seguro de que quieres ${action} la tarea "${tarea.task}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar",
      confirmButtonColor: tarea.enabled ? "#ef4444" : "#10b981",
      cancelButtonColor: "#6b7280",
    })

    if (!result.isConfirmed) return

    // Mostrar estado de carga
    setLoadingStates((prev) => ({ ...prev, [taskId]: true }))

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar estado de la tarea
      setTareas((prev) => prev.map((tarea) => (tarea.id === taskId ? { ...tarea, enabled: !tarea.enabled } : tarea)))

      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "¡Éxito!",
        text: `Tarea ${action}da exitosamente`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      })
    } catch (error) {
      console.error("Error:", error)
      await Swal.fire({
        title: "Error",
        text: `Error al ${action} la tarea`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      // Quitar estado de carga
      setLoadingStates((prev) => ({ ...prev, [taskId]: false }))
    }
  }

  const handleCreateTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Nueva Tarea",
      html: `
        <div class="create-form">
          <div class="form-group">
            <label class="form-label">Materia:</label>
            <select id="swal-input1" class="form-input">
              <option value="">Selecciona una materia</option>
              <option value="Química">Química</option>
              <option value="Física">Física</option>
              <option value="Inglés">Inglés</option>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Historia">Historia</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Descripción de la tarea:</label>
            <textarea id="swal-input2" class="form-textarea" placeholder="Describe la tarea a realizar..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Fecha de expiración:</label>
            <input id="swal-input3" class="form-input" type="date" />
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Crear Tarea",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      preConfirm: () => {
        const materia = document.getElementById("swal-input1").value
        const descripcion = document.getElementById("swal-input2").value
        const fechaExpiracion = document.getElementById("swal-input3").value

        if (!materia) {
          Swal.showValidationMessage("Debes seleccionar una materia")
          return false
        }

        if (!descripcion) {
          Swal.showValidationMessage("La descripción es requerida")
          return false
        }

        if (!fechaExpiracion) {
          Swal.showValidationMessage("La fecha de expiración es requerida")
          return false
        }

        if (descripcion.length < 5) {
          Swal.showValidationMessage("La descripción debe tener al menos 5 caracteres")
          return false
        }

        return [materia, descripcion, fechaExpiracion]
      },
    })

    if (formValues) {
      const [materia, descripcion, fechaExpiracion] = formValues

      // Mostrar loading
      Swal.fire({
        title: "Creando tarea...",
        text: "Por favor espera",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Crear nueva tarea
        const newTask = {
          id: (tareas.length + 1).toString(),
          materia: materia,
          task: descripcion,
          creationDate: new Date().toLocaleDateString("es-ES"),
          expirationDate: new Date(fechaExpiracion).toLocaleDateString("es-ES"),
          status: "por-empezar",
          statusText: "Por empezar",
          enabled: true,
        }

        // Agregar a la lista
        setTareas((prev) => [...prev, newTask])

        // Mostrar mensaje de éxito
        await Swal.fire({
          title: "¡Tarea creada!",
          text: `La tarea "${descripcion}" para ${materia} ha sido creada exitosamente`,
          icon: "success",
          confirmButtonText: "¡Genial!",
          confirmButtonColor: "#3b82f6",
        })
      } catch (error) {
        console.error("Error:", error)
        await Swal.fire({
          title: "Error",
          text: "Hubo un error al crear la tarea. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
        })
      }
    }
  }

  // Filtrar tareas basado en la búsqueda
  const filteredTareas = tareas.filter(
    (tarea) =>
      tarea.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarea.task.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="tareas-page">
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Tareas</h1>

        <div className="section-header">
          <h2 className="section-title">Tus Tareas creadas</h2>
          <button className="create-task-button" onClick={handleCreateTask}>
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
