"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import "./materias.css"

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

export default function Materias() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeNav, setActiveNav] = useState("Materias")
  const [loadingStates, setLoadingStates] = useState({})

  // Datos de las materias
  const [materias, setMaterias] = useState([
    {
      id: "1",
      title: "Química",
      description: "Esta es mi materia creada química",
      enabled: true,
    },
    {
      id: "2",
      title: "Física",
      description: "Esta es mi materia creada Física",
      enabled: true,
    },
    {
      id: "3",
      title: "Inglés",
      description: "Esta es mi materia creada inglés",
      enabled: true,
    },
  ])

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

  const handleDisableMateria = async (materiaId) => {
    const materia = materias.find((m) => m.id === materiaId)
    const action = materia.enabled ? "deshabilitar" : "habilitar"

    const confirmAction = window.confirm(`¿Estás seguro de que quieres ${action} la materia "${materia.title}"?`)

    if (!confirmAction) return

    // Mostrar estado de carga
    setLoadingStates((prev) => ({ ...prev, [materiaId]: true }))

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar estado de la materia
      setMaterias((prev) =>
        prev.map((materia) => (materia.id === materiaId ? { ...materia, enabled: !materia.enabled } : materia)),
      )

      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "¡Éxito!",
        text: `Materia ${action}da exitosamente`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      })
    } catch (error) {
      console.error("Error:", error)
      await Swal.fire({
        title: "Error",
        text: `Error al ${action} la materia`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      // Quitar estado de carga
      setLoadingStates((prev) => ({ ...prev, [materiaId]: false }))
    }
  }

  const handleCreateMateria = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Materia",
      html: `
        <div class="create-form">
          <div class="form-group">
            <label class="form-label">Nombre:</label>
            <input id="swal-input1" class="form-input" placeholder="Ingresa el nombre de tu materia" />
          </div>
          <div class="form-group">
            <label class="form-label">Descripción:</label>
            <textarea id="swal-input2" class="form-textarea" placeholder="Ingresa una descripción para tu materia..."></textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      preConfirm: () => {
        const nombre = document.getElementById("swal-input1").value
        const descripcion = document.getElementById("swal-input2").value

        if (!nombre) {
          Swal.showValidationMessage("El nombre es requerido")
          return false
        }

        if (!descripcion) {
          Swal.showValidationMessage("La descripción es requerida")
          return false
        }

        if (nombre.length < 3) {
          Swal.showValidationMessage("El nombre debe tener al menos 3 caracteres")
          return false
        }

        if (descripcion.length < 10) {
          Swal.showValidationMessage("La descripción debe tener al menos 10 caracteres")
          return false
        }

        // Verificar si ya existe una materia con el mismo nombre
        const existingMateria = materias.find((m) => m.title.toLowerCase() === nombre.toLowerCase())
        if (existingMateria) {
          Swal.showValidationMessage("Ya existe una materia con ese nombre")
          return false
        }

        return [nombre, descripcion]
      },
    })

    if (formValues) {
      const [nombre, descripcion] = formValues

      // Mostrar loading
      Swal.fire({
        title: "Creando materia...",
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

        // Crear nueva materia
        const newMateria = {
          id: (materias.length + 1).toString(),
          title: nombre,
          description: descripcion,
          enabled: true,
        }

        // Agregar a la lista
        setMaterias((prev) => [...prev, newMateria])

        // Mostrar mensaje de éxito
        await Swal.fire({
          title: "¡Materia creada!",
          text: `La materia "${nombre}" ha sido creada exitosamente`,
          icon: "success",
          confirmButtonText: "¡Genial!",
          confirmButtonColor: "#3b82f6",
        })
      } catch (error) {
        console.error("Error:", error)
        await Swal.fire({
          title: "Error",
          text: "Hubo un error al crear la materia. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
        })
      }
    }
  }

  // Filtrar materias basado en la búsqueda
  const filteredMaterias = materias.filter(
    (materia) =>
      materia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="materias-page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="profile-section" onClick={handleProfileClick}>
            <UserIcon />
            <span>Ver perfil</span>
          </div>
          <div className="logout-section" onClick={handleLogoutClick}>
            <LogoutIcon />
            <span>Cerrar Sesión</span>
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
        <h1 className="page-title">Materias</h1>

        <section>
          <h2 className="section-title">Tus materias creadas</h2>

          {filteredMaterias.length > 0 ? (
            <div className="materias-grid">
              {filteredMaterias.map((materia) => (
                <div key={materia.id} className={`materia-card ${!materia.enabled ? "disabled" : ""}`}>
                  <div>
                    <h3 className="materia-title">{materia.title}</h3>
                    <p className="materia-description">{materia.description}</p>
                  </div>

                  <button
                    className="disable-button"
                    onClick={() => handleDisableMateria(materia.id)}
                    disabled={loadingStates[materia.id]}
                  >
                    {loadingStates[materia.id] ? "Procesando..." : materia.enabled ? "Deshabilitar" : "Habilitar"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No se encontraron materias</h3>
              <p>
                {searchTerm ? `No hay materias que coincidan con "${searchTerm}"` : "Aún no has creado ninguna materia"}
              </p>
            </div>
          )}

          <div className="create-button-container">
            <button className="create-button" onClick={handleCreateMateria}>
              Crear materia
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
