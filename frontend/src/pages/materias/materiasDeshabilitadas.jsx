"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import "./materiasDeshabilitadas.css"

// Iconos SVG reutilizados
const UserIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

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

  // Funciones de manejo de eventos
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleNavClick = (navItem) => {
    setActiveNav(navItem)
    console.log(`Navegando a: ${navItem}`)
  }

  const handleProfileClick = () => {
    console.log("Ver perfil")
    alert("Ir a perfil de usuario")
  }

  const handleLogoutClick = () => {
    console.log("Cerrar sesión")
    const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?")
    if (confirmLogout) {
      alert("Sesión cerrada")
    }
  }

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
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="profile-section" onClick={handleProfileClick}>
            <UserIcon />
            <span>Ver perfil</span>
          </div>
          <div className="logout-section" onClick={handleLogoutClick}>
            <LogoutIcon />
            <span>Cerrar Sesion</span>
          </div>
        </div>

        <nav className="header-center">
          {["Inicio", "Materias", "Tareas"].map((item) => (
            <a
              key={item}
              href="#"
              className={`nav-link ${activeNav === item ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item)
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <div className="search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
      </header>

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
                <div key={materia.id} className="materia-card" data-materia-id={materia.id}>
                  <div>
                    <h3 className="materia-title">{materia.title}</h3>
                    <p className="materia-description">{materia.description}</p>
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
