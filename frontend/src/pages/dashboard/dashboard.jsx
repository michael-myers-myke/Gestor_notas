"use client"

import { useState } from "react"
import "./dashboard.css"

// Iconos SVG como componentes
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

const EditIcon = () => (
  <svg className="edit-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeNav, setActiveNav] = useState("Inicio")

  // Datos de las materias
  const subjects = [
    {
      id: "1",
      title: "Química",
      task: "Ejercicios ley de mendel",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "en-proceso",
      statusText: "En proceso",
    },
    {
      id: "2",
      title: "Física",
      task: "Taller 2 fisica 1",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "realizado",
      statusText: "Realizado",
    },
    {
      id: "3",
      title: "Inglés",
      task: "Estudiar ingles",
      creationDate: "5/4/2025",
      expirationDate: "11/6/2025",
      status: "por-empezar",
      statusText: "Por empezar",
    },
  ]

  // Funciones de manejo de eventos
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    console.log("Buscando:", e.target.value)
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

  const handleEditCard = (cardId) => {
    console.log(`Editando tarjeta: ${cardId}`)
    alert(`Editando materia con ID: ${cardId}`)
  }

  const handleStatusClick = (cardId, currentStatus) => {
    console.log(`Cambiando estado de ${cardId} desde ${currentStatus}`)

    // Ciclo de estados
    const statusCycle = {
      "por-empezar": { next: "en-proceso", text: "En proceso" },
      "en-proceso": { next: "realizado", text: "Realizado" },
      realizado: { next: "por-empezar", text: "Por empezar" },
    }

    const nextStatus = statusCycle[currentStatus]
    alert(`Estado cambiado a: ${nextStatus.text}`)
  }

  // Filtrar materias basado en la búsqueda
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.task.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="dashboard">
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
        <h1 className="welcome-title">Welcome Michael</h1>

        <section>
          <h2 className="section-title">Acceso Rapido</h2>

          <div className="cards-grid">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <div key={subject.id} className="subject-card">
                  <div className="card-header">
                    <h3 className="card-title">{subject.title}</h3>
                    <button
                      className="edit-button"
                      onClick={() => handleEditCard(subject.id)}
                      aria-label={`Editar ${subject.title}`}
                      title={`Editar ${subject.title}`}
                    >
                      <EditIcon />
                    </button>
                  </div>

                  <div className="card-content">
                    <div className="task-item">
                      <div className="bullet"></div>
                      <span className="task-text">{subject.task}</span>
                    </div>

                    <div className="date-info">
                      <div>fecha de creacion: {subject.creationDate}</div>
                    </div>

                    <div className="date-info">
                      <div>Fecha de expiracion: {subject.expirationDate}</div>
                    </div>
                  </div>

                  <div className="status-section">
                    <div>
                      <div className="status-label">Estado:</div>
                      <button
                        className={`status-button status-${subject.status}`}
                        onClick={() => handleStatusClick(subject.id, subject.status)}
                        title="Click para cambiar estado"
                      >
                        {subject.statusText}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No se encontraron materias que coincidan con "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
