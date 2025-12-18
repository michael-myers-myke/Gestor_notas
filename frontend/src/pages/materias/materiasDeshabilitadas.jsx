"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import "./materiasDeshabilitadas.css"
import Navbar from "../../components/navbar"



export default function MateriasDeshabilitadas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeNav, setActiveNav] = useState("Materias")
  const [loadingStates, setLoadingStates] = useState({})
  const [message, setMessage] = useState("")

  // Datos de las materias deshabilitadas (simulando datos del mockup)
  const [materiasDeshabilitadas, setMateriasDeshabilitadas] = useState([
    {
      id: "1",
      title: "Química",
      description: "Esta es mi materia creada química",
      enabled: false,
    },
    {
      id: "4",
      title: "Español",
      description: "Esta es mi materia creada español",
      enabled: false,
    },
  ])

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])



  const handleEnableMateria = async (materiaId) => {
    const materia = materiasDeshabilitadas.find((m) => m.id === materiaId)

    const result = await Swal.fire({
      title: "¿Habilitar materia?",
      text: `¿Estás seguro de que quieres habilitar la materia "${materia.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, habilitar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
    })

    if (!result.isConfirmed) return

    // Mostrar estado de carga
    setLoadingStates((prev) => ({ ...prev, [materiaId]: true }))

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Agregar animación de habilitación
      const cardElement = document.querySelector(`[data-materia-id="${materiaId}"]`)
      if (cardElement) {
        cardElement.classList.add("enabling")
      }

      // Esperar a que termine la animación
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remover de la lista de deshabilitadas
      setMateriasDeshabilitadas((prev) => prev.filter((materia) => materia.id !== materiaId))

      // Mostrar mensaje de éxito
      setMessage(`La materia "${materia.title}" ha sido habilitada exitosamente`)

      // Mostrar SweetAlert de éxito
      await Swal.fire({
        title: "¡Materia habilitada!",
        text: `La materia "${materia.title}" ha sido habilitada exitosamente`,
        icon: "success",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#10b981",
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (error) {
      console.error("Error:", error)
      setMessage("Error al habilitar la materia. Inténtalo de nuevo.")

      await Swal.fire({
        title: "Error",
        text: "Hubo un error al habilitar la materia. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      // Quitar estado de carga
      setLoadingStates((prev) => ({ ...prev, [materiaId]: false }))
    }
  }

  const handleBackToMaterias = () => {
    console.log("Volver a materias")
    alert("Redirigiendo a la página de materias...")
  }

  // Filtrar materias basado en la búsqueda
  const filteredMaterias = materiasDeshabilitadas.filter(
    (materia) =>
      materia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="materias-deshabilitadas-page">
      <Navbar 
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Materias Deshabilitadas</h1>

        {/* Mensaje de estado */}
        {message && <div className={message.includes("Error") ? "error-message" : "success-message"}>{message}</div>}

        <section>
          <h2 className="section-title">Tus materias Deshabilitadas</h2>

          {filteredMaterias.length > 0 ? (
            <div className="materias-grid">
              {filteredMaterias.map((materia) => (
                <div key={materia.id} className="materia-card-deshabilitadas" data-materia-id={materia.id}>
                  <div>
                    <h3 className="materia-title-deshabilitados">{materia.title}</h3>
                    <p className="materia-description-deshabilitados">{materia.description}</p>
                  </div>

                  <button
                    className="enable-button"
                    onClick={() => handleEnableMateria(materia.id)}
                    disabled={loadingStates[materia.id]}
                  >
                    {loadingStates[materia.id] ? "Habilitando..." : "Habilitar"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>No hay materias deshabilitadas</h3>
              <p>
                {searchTerm
                  ? `No hay materias deshabilitadas que coincidan con "${searchTerm}"`
                  : "¡Excelente! No tienes materias deshabilitadas en este momento."}
              </p>
              <button className="back-button" onClick={handleBackToMaterias}>
                Volver a Materias
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
