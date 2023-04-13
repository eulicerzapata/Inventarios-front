import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  createEstados,
  getEstados,
  editarEstado,
} from "../services/estadosservice";
import Modal from "./ui/Modal";
import ModalEdit from "./ui/ModalEdit";

import TablaCabecera from "./ui/TablaCabecera";


export default function Estados() {
  const title = "Tipo de Estado";
  const [estados, setEstados] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [estado, setEstado] = useState({
    nombre: "",
  });
  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

  const listEstados = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getEstados(query);
      console.log(data);
      setEstados(data);

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
    listEstados();
  }, [query]);

  const changeSwitch = () => {
    setQuery(!query);
  };

  const handleChange = (e) => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    });
  };

  const saveEstado = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await createEstados(estado);
      console.log(response);
      setEstado({ nombre: "" });
      listEstados();
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
    setEstado({ nombre: "" });
    if (id) setId("");
  };

  const selectEstado = (evt) => {
    evt.preventDefault();
    setId(evt.target.id);
    const tEq = estados.filter((estado) => estado._id === evt.target.id);
    setEstado({ ...tEq[0] });
  };

  const editEstado = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarEstado(id, estado);
      console.log(response);
      setEstado({ nombre: "" });
      listEstados();
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
      <ModalEdit
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        modulo={estado}
        loadingSave={loadingSave}
        editar={editEstado}
      />
      <Modal
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        modulo={estado}
        loadingSave={loadingSave}
        save={saveEstado}
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
            <TablaCabecera />
            <tbody>
              {estados.map((estado, index) => {
                return (
                  <tr key={estado._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{estado.nombre}</td>
                    <td>{estado.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(estado.fechaCreacion).format("YYYY-MM-DD")}</td>
                    <td>
                      {dayjs(estado.fechaActualizacion).format("YYYY-MM-DD")}
                    </td>
                    <td>
                    <button 
                            onClick={selectEstado}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={estado._id}
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
