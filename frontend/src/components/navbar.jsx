"use client"

import { useState } from "react"
import "./navbar.css"
import {Link, useNavigate}  from "react-router-dom"


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

// const SearchIcon = () => (
//   <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
//   </svg>
// )

export default function Navbar({ activeNav, setActiveNav, searchTerm, setSearchTerm }) {

  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleNavClick = (item) => {
    setActiveNav(item)
  }

  const handleProfileClick = () => {
    alert("Ir a perfil de usuario")
  }

  const handleLogoutClick = () => {
    if(window.confirm("Estas seguro que quieres cerrar sesion")) {
      navigate("/login");
    }
  };

  const navLinks = [
    {name: "Inicio", path: "/dashboard"},
    {name: "Materias", path: "/materias"},
    {name: "Tareas", path: "/tareas"}
  ]

  return (
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
        {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`nav-link ${activeNav === link.name ? "active" : ""}`}
          onClick={() => setActiveNav(link.name)}
        >
          {link.name}
        </Link>
        ))}
      </nav>

      <div className="header-right">
        {/* <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div> */}
      </div>
    </header>
  )
}
