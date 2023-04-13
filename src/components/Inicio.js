import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getInventarios } from "../services/InventarioServices";
import "../css/inicio.css";

export default function Inicio() {
  
  const [inventarios, setInventarios] = useState([]);
  const [query, ] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  

  const listInventarios = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getInventarios(query);
      console.log(data);
      setInventarios(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    listInventarios();
  }, [query]);

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          Ha ocurrido un error
        </div>
      )}

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : 
        
        <>
        <container className="container-inicio">
          {inventarios.map((inventario, index) => {
            return (
              <div class="card">
                <img src={inventario.foto} class="card-img-top img-thumbnail" alt="..." />
                <div class="card-body">
                  <p class="card-text">descripción: {inventario.descripcion}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Serial: {inventario.serial}</li>
                  <li class="list-group-item">Modelo: {inventario.modelo}</li>
                  <li class="list-group-item">Color: {inventario.color}</li>
                  <li class="list-group-item">
                    Fecha compra: {dayjs(inventario.fechaCompra).format("YYYY-MM-DD")}
                  </li>
                  <li class="list-group-item">Precio: {inventario.precio}</li>
                  <li class="list-group-item">
                    Usuario: {inventario.usuario.nombre}
                  </li>
                 <li class="list-group-item">
                    Marca: {inventario.marca.nombre}
                  </li>
                  <li class="list-group-item">
                    Estado: {inventario.estado.nombre}
                  </li>
                </ul>
              </div>
            );
          })}
          </container>
        </>
      }
    </>
  );
}
