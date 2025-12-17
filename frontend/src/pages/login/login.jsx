import React, { useState } from "react";
import "./registro.css";
import api from '../../services/api'
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Registro() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', {email, password})

      if(res.data.token){
        localStorage.setItem('token', res.data.token);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesion exitoso",
          text: `Bienvenido`
        });

        navigate('/dashboard');

        const decoded = jwtDecode(res.data.token);
      }else {

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo autenticar"
        })
      }
    } catch (error) {
      console.log(error)

      if(error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesion",
          text: "Datos incorrectos, intenta nuevamente"
        })
      }else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error inesperado"
        })
      }
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
          <h2 className="form-title">Iniciar Sesion</h2>

          <form onSubmit={handleLogin} className="form">
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
              Iniciar Sesion
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default Registro;
