import { useState } from "react";
import "./registro.css";
import api from '../../services/api';
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

function Registro () {

  //Se llaman los estados a utilizar
  const [nombre, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/crearUsuario', {nombre, email, password});

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Usuario registrado correctamente",
        confirmButtonText: "Continuar"
      });


      navigate('/login');
    } catch (error) {
      console.error(error)

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario"
      })
    }
  }
  return (
    <div className="signup-container">
      {/* Lado izquierdo */}
      <div className="left-side">
        <div className="content-wrapper">
          <h1 className="title">
            BIENVENIDO A<br />
            NOTES GESTOR
          </h1>
          <p className="subtitle">
            Regístrate o inicia sesión para poder usar el gestor de notas especializado en la agilidad y facilidad para maestro y estudiantes
          </p>
        </div>

        <div className="curved-element">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="curve-svg">
            <path d="M0,0 Q50,50 0,100 L100,100 L100,0 Z" fill="white" opacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="right-side">
        <div className="form-container">
          <h2 className="form-title">Crea tu cuenta</h2>

          <form onSubmit={handleRegistro} className="form">
            <div className="input-group">
              <label htmlFor="nombre" className="label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setName(e.target.value)}
                className={`input`}
                required
              />
              {/* {errors.name && <span className="error-message">{errors.name}</span>} */}
            </div>

            <div className="input-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input`}
                required
              />
              {/* {errors.email && <span className="error-message">{errors.email}</span>} */}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ingresa una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input`}
                required
              />
              {/* {errors.password && <span className="error-message">{errors.password}</span>} */}
            </div>

            <button type="submit" className="submit-button">
              Registrarse
            </button>
          </form>

          <div className="login-link">
            <button type="button" className="link-button">
              Iniciar sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
