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
              <div className="card">
                <img src={inventario.foto} className="card-img-top img-thumbnail" alt="..." />
                <div className="card-body">
                  <p className="card-text">descripción: {inventario.descripcion}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Serial: {inventario.serial}</li>
                  <li className="list-group-item">Modelo: {inventario.modelo}</li>
                  <li className="list-group-item">Color: {inventario.color}</li>
                  <li className="list-group-item">
                    Fecha compra: {dayjs(inventario.fechaCompra).format("YYYY-MM-DD")}
                  </li>
                  <li className="list-group-item">Precio: {inventario.precio}</li>
                  <li className="list-group-item">
                    Usuario: {inventario.usuario.nombre}
                  </li>
                 <li className="list-group-item">
                    Marca: {inventario.marca.nombre}
                  </li>
                  <li className="list-group-item">
                    Estado: {inventario.estado.nombre}
                  </li>
                  <li className="list-group-item">
                    Tipo Equipo: {inventario.tipoEquipo.nombre}
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
