import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  createInventarios,
  getInventarios,
  editarInventarios,
} from "../services/InventarioServices";
import ModalAgregar from "./ui/modalesInventarios.js/ModalAgregar";


import { getEstados } from "../services/estadosservice";
import { getTipoEquipos } from "../services/TipoEquipoServices";
import { getUsuarios } from "../services/UsusariosService";
import { getMarca } from "../services/Marcasservices";

export default function Inventarios() {
  const title = "Tipo de Inventarios";
  const [inventarios, setInventarios] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inventario, setInventario] = useState({
    serial: "",
    modelo: "",
    descripcion: "",
    foto: "",
    color: "",
    fechaCompra: "",
    precio: "",
    usuario: "",
    marca: "",
    estado: "",
    tipoEquipo: "",
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [modulos, setModulos] = useState(null);

  const [id, setId] = useState("");

  const listarModulos = async () => {
    try {
      const estados = await getEstados(query);
      const tipos = await getTipoEquipos(query);
      const marcas = await getMarca(query);
      const usuarios = await getUsuarios(query);
      console.log(estados.data);
      console.log(tipos.data);
      console.log(marcas.data);
      console.log(usuarios.data);
      const arregloModulos = {
        estados: estados.data,
        tipos: tipos.data,
        marcas: marcas.data,
        usuarios: usuarios.data,
      };
      setModulos(arregloModulos);
      console.log(modulos);
    } catch (error) {
      console.log(error);
    }
  };

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
    listarModulos();
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
      let idUsuario, idEstado, idTipoEquipo, idMarca;

      modulos.usuarios.map((el) => {
        if (inventario.usuario === el.nombre) {
          idUsuario = el._id;
        }
      });

      modulos.marcas.map((el) => {
        if (inventario.marca === el.nombre) {
          idMarca = el._id;
        }
      });

      modulos.estados.map((el) => {
        if (inventario.estado === el.nombre) {
          idEstado = el._id;
        }
      });

      modulos.tipos.map((el) => {
        if (inventario.tipoEquipo === el.nombre) {
          idTipoEquipo = el._id;
        }
      });

      const nuevoInventario = {
        serial: inventario.serial,
        modelo: inventario.modelo,
        descripcion: inventario.descripcion,
        foto: inventario.foto,
        color: inventario.color,
        fechaCompra: inventario.fechaCompra,
        precio: inventario.precio,
        usuario: idUsuario,
        marca: idMarca,
        estado: idEstado,
        tipoEquipo: idTipoEquipo,
      };
      console.log(nuevoInventario);
      const response = await createInventarios(nuevoInventario);
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
      descripcion: "",
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
      let idUsuario, idEstado, idTipoEquipo, idMarca;

      modulos.usuarios.map((el) => {
        if (inventario.usuario === el.nombre) {
          idUsuario = el._id;
        }
      });

      modulos.marcas.map((el) => {
        if (inventario.marca === el.nombre) {
          idMarca = el._id;
        }
      });

      modulos.estados.map((el) => {
        if (inventario.estado === el.nombre) {
          idEstado = el._id;
        }
      });

      modulos.tipos.map((el) => {
        if (inventario.tipoEquipo === el.nombre) {
          idTipoEquipo = el._id;
        }
      });

      const nuevoInventario = {
        serial: inventario.serial,
        modelo: inventario.modelo,
        descripcion: inventario.descripcion,
        foto: inventario.foto,
        color: inventario.color,
        fechaCompra: inventario.fechaCompra,
        precio: inventario.precio,
        usuario: idUsuario,
        marca: idMarca,
        estado: idEstado,
        tipoEquipo: idTipoEquipo,
      };
      const response = await editarInventarios(id, nuevoInventario);
      console.log(response);

      setInventario({
        serial: "",
        modelo: "",
        descripcion: "",
        foto: "",
        color: "",
        fechaCompra: "",
        precio: "",
        usuario: "",
        marca: "",
        estado: "",
        tipoEquipo: "",
      });

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

      <>
        {inventarios.map((modul) => {
          return (
            <div
              className="modal fade"
              id="exampleModalEdit"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      editar {title}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          serial:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="serial"
                          onChange={handleChange}
                          value={inventario.serial}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Modelo:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="modelo"
                          onChange={handleChange}
                          value={inventario.modelo}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          descripción:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="descripcion"
                          onChange={handleChange}
                          value={inventario.descripcion}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Foto:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="foto"
                          onChange={handleChange}
                          value={inventario.foto}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Color:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="color"
                          onChange={handleChange}
                          value={inventario.color}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Fecha Compra:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="fechaCompra"
                          onChange={handleChange}
                          value={inventario.fechaCompra}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          precio:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="precio"
                          onChange={handleChange}
                          value={inventario.precio}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Usuario:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="usuario"
                          onChange={handleChange}
                          value={modul.usuario.nombre}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          marca:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="marca"
                          onChange={handleChange}
                          value={modul.marca.nombre}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Estado:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="estado"
                          onChange={handleChange}
                          value={modul.estado.nombre}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          tipoEquipo:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="tipoEquipo"
                          onChange={handleChange}
                          value={modul.tipoEquipo.nombre}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    {loadingSave ? (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Guardando...
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={editInventario}
                        closeModal
                      >
                        Enviar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>

      <container className="container-botones">
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
