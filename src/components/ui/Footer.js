import React from "react";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <NavLink
          tabIndex={1}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          tabIndex={2}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/tipoEquipos"
        >
          Tipo Equipos
        </NavLink>
        <NavLink
          tabIndex={3}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/estados"
        >
          Estados
        </NavLink>
        <NavLink
          tabIndex={4}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/usuarios"
        >
          Usuarios
        </NavLink>
        <NavLink
          tabIndex={5}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/marcas"
        >
          Marcas
        </NavLink>
        <NavLink
          tabIndex={6}
          className="nav-link px-2 text-body-secondary nav-item"
          to="/inventario"
        >
          Inventario
        </NavLink>
      </ul>
      <p className="text-center text-body-secondary">© 2023 Company, Inc</p>
    </footer>
  );
}
