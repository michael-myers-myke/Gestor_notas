"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import "./materias.css"
import Navbar from "../../components/navbar"



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
      {/* Navbar reutilizable */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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
