import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  createInventarios,
  getInventarios,
  editarInventarios,
} from "../services/InventarioServices";
import ModalAgregar from "./ui/modalesInventarios.js/ModalAgregar";

import ModalEditar from "./ui/modalesInventarios.js/ModalEditar";
import {getEstados} from "../services/estadosservice"
import {getTipoEquipos} from "../services/TipoEquipoServices"
import { getUsuarios} from "../services/UsusariosService"
import {getMarca} from "../services/Marcasservices"

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
  const [modulos, setModulos]=useState(null);

  const [id, setId] = useState("");

  const listarModulos = async() =>{
    try {
      const estados= await getEstados(query);
      const tipos= await getTipoEquipos(query);
      const marcas= await getMarca(query);
      const usuarios= await getUsuarios(query);
      console.log(estados.data)
      console.log(tipos.data)
      console.log(marcas.data)
      console.log(usuarios.data)
      const arregloModulos = { 
        estados:estados.data,
        tipos:tipos.data,
        marcas:marcas.data,
        usuarios:usuarios.data,
       }
       setModulos(arregloModulos)
        console.log(modulos)
    } catch (error) {
      console.log(error)
    }
  }

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
    listarModulos()
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

      modulos.usuarios.map(el=>{
        if (inventario.usuario === el.nombre ) {
          idUsuario=el._id
        }
      })

      modulos.marcas.map(el=>{
        if (inventario.marca === el.nombre ) {
          idMarca=el._id
        }
      })

      modulos.estados.map(el=>{
        if (inventario.estado === el.nombre ) {
          idEstado=el._id
        }
      })

      modulos.tipos.map(el=>{
        if (inventario.tipoEquipo === el.nombre ) {
          idTipoEquipo=el._id
        }
      })
      
      const nuevoInventario ={
        serial:inventario.serial,
        modelo:inventario.modelo,
        descripcion:inventario.descripcion,
        foto:inventario.foto,
        color:inventario.color,
       fechaCompra:inventario.fechaCompra,
       precio:inventario.precio,
        usuario:idUsuario,
        marca:idMarca,
        estado:idEstado,
        tipoEquipo:idTipoEquipo
      }
      console.log(nuevoInventario)
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
      let idUsuario, idEstado, idTipoEquipo, idMarca;

      modulos.usuarios.map(el=>{
        if (inventario.usuario === el.nombre ) {
          idUsuario=el._id
        }
      })

      modulos.marcas.map(el=>{
        if (inventario.marca === el.nombre ) {
          idMarca=el._id
        }
      })

      modulos.estados.map(el=>{
        if (inventario.estado === el.nombre ) {
          idEstado=el._id
        }
      })

      modulos.tipos.map(el=>{
        if (inventario.tipoEquipo === el.nombre ) {
          idTipoEquipo=el._id
        }
      })
      
      const nuevoInventario ={
        serial:inventario.serial,
        modelo:inventario.modelo,
        descripcion:inventario.descripcion,
        foto:inventario.foto,
        color:inventario.color,
       fechaCompra:inventario.fechaCompra,
       precio:inventario.precio,
        usuario:idUsuario,
        marca:idMarca,
        estado:idEstado,
        tipoEquipo:idTipoEquipo
      }
      const response = await editarInventarios(id, nuevoInventario);
      console.log(response);
      
      setInventario({ serial: "" , modelo: "" ,descripcion:"" ,foto: "" , color: "", fechaCompra: "" ,precio: "" ,usuario:"",marca:"",estado:"",tipoEquipo:"" });
      
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
