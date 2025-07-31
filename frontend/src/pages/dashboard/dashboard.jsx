"use client"

import { useState } from "react"
import "./dashboard.css"
import Navbar from "../../components/navbar"

// Iconos SVG como componentes
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
      {/* Navbar reutilizable */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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
