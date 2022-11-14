import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  async function getUserInfo() {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        alert("Error obteniendo la información del usuario");
      }
      const body = await response.json();
      console.log(body);
    } catch (error) {
      console.log("Error en la solicitud");
    }
  }

  useEffect(() => {
    console.log(navigate);
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
    getUserInfo();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido/a a tu sesión!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
    </div>
  );
};
