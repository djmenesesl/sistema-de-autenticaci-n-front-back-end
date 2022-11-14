import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div>
          {localStorage.getItem("token") ? (
            <div className="dropdown me-1">
              <button
                className="btn dropdown-toggle bg-transparent text-center boton-profile-navbar"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://res.cloudinary.com/dz8eyr7mb/image/upload/v1667342806/Animalium/Avatar_k0z1ns.png"
                  alt=""
                  className="d-flex justify-content-center text-center rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-start"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    style={{ color: "#20C997" }}
                    onClick={() => {
                      actions.removeToken();
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket bg-transparent me-2"></i>
                    Cerrar sesion
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <React.Fragment>
              <button className="me-2 p-2 boton-iniciar" type="submit">
                <Link to="/login" style={{ color: "#20C997" }}>
                  Iniciar Sesión
                </Link>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};
