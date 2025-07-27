import React, { useState } from "react";
import "./registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El correo es requerido";
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        alert("¡Registro exitoso!");
        setIsLoading(false);
        setFormData({
          nombre: "",
          email: "",
          password: "",
        });
      }, 1500);
    }
  };

  const handleLoginClick = () => {
    alert("Redirigiendo al login...");
  };

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

          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="nombre" className="label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`input ${errors.nombre ? "input-error" : ""}`}
                required
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className={`input ${errors.email ? "input-error" : ""}`}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ingresa una contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className={`input ${errors.password ? "input-error" : ""}`}
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Iniciar"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default Registro;
