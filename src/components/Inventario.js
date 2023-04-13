import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  createInventarios,
  getInventarios,
  editarInventarios,
} from "../services/InventarioServices";
import ModalAgregar from "./ui/modalesInventarios.js/ModalAgregar";

import ModalEditar from "./ui/modalesInventarios.js/ModalEditar";

export default function Inventarios() {
  const title = "Tipo de Inventarios";
  const [inventarios, setInventarios] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inventario, setInventario] = useState({
    serial: "",modelo:"",descripcion:"",foto:"",color:"",fechaCompra:"",precio:"",usuario:"" , marca:"",estado:"",tipoEquipo:"",
  });
  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

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

  const changeSwitch = () => {
    setQuery(!query);
  };

  const handleChange = (e) => {
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value,
      
    });
  };

  const saveInventario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await createInventarios(inventario);
      console.log(response);
      setInventario({ serial: "" });
      setInventario({ modelo: "" });
      setInventario({ descripcion: "" });
      setInventario({ foto: "" });
      setInventario({ color: "" });
      setInventario({ fechaCompra: "" });
      setInventario({ precio: "" });
      setInventario({ usuario: "" });
      setInventario({ marca: "" });
      setInventario({ estado: "" });
      setInventario({ tipoEquipo: "" });

      listInventarios();
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoadingSave(false);
    }
  };

  const closeModal = () => {
    setInventario({
      serial: "",
      modelo: "",
      descripcion:"",
      foto: "",
      color: "",
      fechaCompra: "",
      precio: "",
      usuario: "",
      marca: "",
      estado: "",
      tipoEquipo: "",
    });

    if (id) setId("");
  };

  const selectInventario = (evt) => {
    evt.preventDefault();
    setId(evt.target.id);
    const tEq = inventarios.filter(
      (inventario) => inventario._id === evt.target.id
    );
    setInventario({ ...tEq[0] });
  };

  const editInventario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarInventarios(id, inventario);
      console.log(response);
      setInventario({ serial: "" , modelo: "" ,descripcion:"" ,foto: "" , color: "", fechaCompra: "" ,precio: "" ,precio: "",usuario:"",marca:"",estado:"",tipoEquipo:"" });
      listInventarios();
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoadingSave(false);
    }
  };

  return (
    <>
      <ModalAgregar
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        modulo={inventario}
        loadingSave={loadingSave}
        save={saveInventario}
      />

        <ModalEditar
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        modulo={inventario}
        loadingSave={loadingSave}
       editar={editInventario}
      />

<container className="container-botones">
        <div className="form-check form-switch input">
          <input 
            className="form-check-input " 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked"
            checked={query}
            onChange={changeSwitch}
            
          />
          <label 
            
            className="form-check-label" 
            htmlFor="flexSwitchCheckChecked"
          >
            Activos
          </label>
        </div>
        <button 
          type="button" 
          
          className="btn btn-outline-primary boton-agrgar "
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
        </container>
      {error && (
        <div className="alert alert-danger" role="alert">
          Ha ocurrido un error
        </div>
      )}

      <div className="table-responsive">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">serial</th>
                <th scope="col">modelo</th>
                <th scope="col">descripcion</th>
                <th scope="col">foto</th>
                <th scope="col">color</th>
                <th scope="col">fecha Compra</th>
                <th scope="col">precio</th>
                <th scope="col">usuario</th>
                <th scope="col">marca</th>
                <th scope="col">estado</th>
                <th scope="col">tipoEquipo</th>
                <th scope="col">Fecha creac.</th>
                <th scope="col">Fecha act.</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {inventarios.map((inventario, index) => {
                return (
                  <tr key={inventario._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{inventario.serial}</td>
                    <td>{inventario.modelo}</td>
                    <td>{inventario.descripcion}</td>
                    <td>{inventario.foto}</td>
                    <td>{inventario.color}</td>
                    <td>
                      {dayjs(inventario.fechaCompra).format("YYYY-MM-DD")}
                    </td>
                    <td>{inventario.precio}</td>
                    <td>{inventario.usuario.nombre}</td>
                    <td>{inventario.marca.nombre}</td>
                    <td>{inventario.estado.nombre}</td>
                    <td>{inventario.tipoEquipo.nombre}</td>

                    <td>
                      {dayjs(inventario.fechaCreacion).format("YYYY-MM-DD")}
                    </td>
                    <td>
                      {dayjs(inventario.fechaActualizacion).format(
                        "YYYY-MM-DD"
                      )}
                    </td>
                    <td>
                    <button 
                            onClick={selectInventario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={inventario._id}
                          >
                            Editar
                            </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
