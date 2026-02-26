
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import "./materias.css"
import Navbar from "../../components/navbar"
import { useNavigate } from "react-router-dom"
import api from '../../services/api'
import { autenticado } from "../../services/auth"
import { userId } from '../../services/auth'




export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();
  const id_usuario = userId();
  const [busquedaMateria, setBusquedaMateria] = useState('');
  

  useEffect(() => {
    if (!autenticado()) {
      navigate('/login');
      return;
    }

    ListarMaterias();
  }, [navigate]);


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

        return { nombre, descripcion }
      }
    });

    if (!formValues) return;

    try {
      const res = await api.post(`/crearMateria/${id_usuario}`, { nombre_materia: formValues.nombre, descripcion: formValues.descripcion });

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

  const ListarMaterias = async () => {
    try {
      const res = await api.get(`/listarMaterias/${id_usuario}`)
      // console.log("res backend: ", res.data);
      setMaterias(res.data.materias);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron encontrar las materias del usuario",
        "error"
      );
    }
  };

  const SearchIcon = () => (
    <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )

  const filtrarMaterias = materias.filter((materia) =>
    materia.nombre_materia.toLowerCase().includes(busquedaMateria.toLowerCase())
  );


  return (
    <div className="materias-page">
      {/* Navbar reutilizable */}
      <Navbar
      // activeNav={activeNav}
      // setActiveNav={setActiveNav}
      // searchTerm={searchTerm}
      // setSearchTerm={setSearchTerm}
      />
      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Materias</h1>
        <section>
          <section className="section-header">
            <h2 className="section-title">Tus materias creadas</h2>

            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar"
                value={busquedaMateria}
                onChange={(e) => busquedaMateria(e.target.value)}
                className="search-input"
              />
            </div>
          </section>


          <div className="materias-grid">
            {materias.map((materia) => (
              <div key={materia.id} className="materia-card">
                <div>
                  <h3 className="materia-title">{materia.nombre_materia}</h3>
                  <p className="materia-description">{materia.descripcion}</p>
                </div>
                <button
                  className="disable-button"
                // onClick={() => handleDisableMateria(materias.id)}
                // disabled={loadingStates[materias.id]}
                >
                  {/* {loadingStates[materias.id] ? "Procesando..." : materias.enabled ? "Deshabilitar" : "Habilitar"} */}
                  Deshabilitar
                </button>
              </div>
            ))}
          </div>

          {materias.length === 0 && (
            <div className="empty-state">
              <h3>No se encontraron materias</h3>
              <p>
                {/* {searchTerm ? `No hay materias que coincidan con ""` : "Aún no has creado ninguna materia"} */}
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
