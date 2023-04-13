import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  createUsuario,
  getUsuarios,
  editarUsuarios,
} from "../services/UsusariosService";

import ModalUsuario from "./ui/ModalUsuario";
import ModalEUs from "./ui/ModalEUs";



export default function Usuarios() {
  const title = "Tipo de Usuario";
  const [usuarios, setUsuarios] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
  });

  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

  const listUsuarios = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getUsuarios(query);
      console.log(data);
      setUsuarios(data);

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
    listUsuarios();
  }, [query]);

  const changeSwitch = () => {
    setQuery(!query);
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
    });
  };

  const saveusuario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await createUsuario(usuario);
      console.log(response);
      setUsuario({ nombre: "" });
      setUsuario({ email: "" });
      listUsuarios();
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
    setUsuario({ nombre: "" , email: "" });
    if (id) setId("");
  };

  const selectusuario = (evt) => {
    evt.preventDefault();
    setId(evt.target.id);
    const tEq = usuarios.filter((usuario) => usuario._id === evt.target.id);
    setUsuario({ ...tEq[0] });
  };

  const editusuario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarUsuarios(id, usuario);
      console.log(response);
      setUsuario({ nombre: "" });
      setUsuario({ email: "" });
      listUsuarios();
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
      {" "}
      <ModalEUs
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          modulo={usuario}
          loadingSave={loadingSave}
          editar={editusuario}
        />
      <ModalUsuario
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        modulo={usuario}
        loadingSave={loadingSave}
        save={saveusuario}
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
                <th scope="col">Nombre</th>
                <th scope="col">email</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha creac.</th>
                <th scope="col">Fecha act.</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => {
                return (
                  <tr key={usuario._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(usuario.fechaCreacion).format("YYYY-MM-DD")}</td>
                    <td>
                      {dayjs(usuario.fechaActualizacion).format("YYYY-MM-DD")}
                    </td>
                    <td>
                      <button
                        onClick={selectusuario}
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalEdit"
                        id={usuario._id}
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
