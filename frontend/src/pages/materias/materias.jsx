
import { useState, useEffect} from "react"
import Swal from "sweetalert2"
import "./materias.css"
import Navbar from "../../components/navbar"
import { Navigate, useNavigate } from "react-router-dom"
import api from '../../services/api'
import { autenticado } from "../../services/auth" 



export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();



  const CreateMateria = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Materia",
      html: `
        <div class="create-form">
          <div class="form-group">
            <label class="form-label">Nombre:</label>
            <input id="swal-nombre" class="form-input" placeholder="Ingresa el nombre de tu materia" />
          </div>
          <div class="form-group">
            <label class="form-label">Descripción:</label>
            <textarea id="swal-descripcion" class="form-textarea" placeholder="Ingresa una descripción para tu materia..."></textarea>
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
        const nombre = document.getElementById("swal-nombre").value
        const descripcion = document.getElementById("swal-descripcion").value

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

        return {nombre, descripcion}
      },
    })

    if (formValues) {
      const [nombre, descripcion] = formValues

    }

    try {
      const res = await api.post('/crearMateria', {nombre: formValues.nombre, descripcion: formValues.descripcion});

      setMaterias(prev => [...prev, res.data.materia]);

      Swal.fire(
        "Materia Creada",
        "La materia se creo correctamente",
        "success"
      );
      
    } catch (error) {
      console.log(error)
      Swal.fire(
        "Error",
        "No se pudo crear la materia",
        "error"
      );
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
                <div key={materias.id} className={`materia-card ${!materias.enabled ? "disabled" : ""}`}>
                  <div>
                    <h3 className="materia-title">{materias.title}</h3>
                    <p className="materia-description">{materias.description}</p>
                  </div>

                  <button
                    className="disable-button"
                    onClick={() => handleDisableMateria(materias.id)}
                    disabled={loadingStates[materias.id]}
                  >
                    {loadingStates[materias.id] ? "Procesando..." : materias.enabled ? "Deshabilitar" : "Habilitar"}
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
            <button className="create-button" onClick={CreateMateria}>
              Crear materia
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
