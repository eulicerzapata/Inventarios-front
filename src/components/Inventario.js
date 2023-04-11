import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createInventarios, getInventarios, editarInventarios  } from '../services/InventarioServices'
import { getUsuarios } from '../services/UsusariosService'


export default function Inventarios() {
const title= 'Tipo de Inventarios'
const [inventarios, setInventarios] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [inventario, setinventario] = useState({
  nombre: ''
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')


const listInventarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getInventarios(query)
    console.log(data)
    setInventarios(data)
    
    setTimeout(() => {
      setLoading(false)
    }, 500)
    
  }catch(e){
    console.log(e)
    setError(true)
    setLoading(false)
  }
}

useEffect(() => {
  listInventarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setinventario({
    ...inventario,
    [e.target.name]: e.target.value
  })
}

const saveInventario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createInventarios(inventario)
    console.log(response)
    setinventario({nombre: ''})
    listInventarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

const closeModal = () => {
  setinventario({nombre: ''})
  if(id)setId('')
}

const selectInventario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = inventarios.filter(inventario => inventario._id === evt.target.id)
  setinventario({...tEq[0]})
}

const editInventario= async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarInventarios(id, inventario)
    console.log(response)
    setinventario({nombre: ''})
    listInventarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

  return (
    <>
       
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
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
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
        {
          error && 
          (
            <div className="alert alert-danger" role="alert">
              Ha ocurrido un error
            </div>
          )
        }
        
        <div className='table-responsive'>
          {
            loading 
            ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            :
            (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">serial</th>
                  <th scope="col">modelo</th>
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
                {
                  inventarios.map((inventario, index) => {
                    return (
                      <tr key={inventario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{inventario.serial}</td>
                        <td>{inventario.modelo}</td>
                        <td>{inventario.foto}</td>
                        <td>{inventario.color}</td>
                        <td>{dayjs(inventario.fechaCompra).format('YYYY-MM-DD')}</td>
                        <td>{inventario.precio}</td>
                        <td>{inventario.usuario}</td>
                        <td>{inventario.marca}</td>
                        <td>{inventario.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{inventario.tipoEquipo}</td>
                       
                       
                        <td>{dayjs(inventario.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(inventario.fechaActualizacion).format('YYYY-MM-DD')}</td>
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
                    )
                  })
                }
              </tbody>
              </table>
            )
          }
        </div>
    </>
  )
}

