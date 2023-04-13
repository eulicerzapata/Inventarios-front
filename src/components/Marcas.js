import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createMarca, getMarca, editarMarca  } from '../services/Marcasservices'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'

import TablaCabecera from './ui/TablaCabecera'


export default function Marcas() {
const title= 'Tipo de Marca'
const [marcas, setMarcas] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [marca, setMarca] = useState({
  nombre: ''
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listMarcas = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getMarca(query)
    console.log(data)
    setMarcas(data)
    
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
  listMarcas()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setMarca({
    ...marca,
    [e.target.name]: e.target.value
  })
}

const saveMarca = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createMarca(marca)
    console.log(response)
    setMarca({nombre: ''})
    listMarcas()
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
  setMarca({nombre: ''})
  if(id)setId('')
}

const selectMarca = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = marcas.filter(marca => marca._id === evt.target.id)
  setMarca({...tEq[0]})
}

const editarmarca = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarMarca(id, marca)
    console.log(response)
    setMarca({nombre: ''})
    listMarcas()
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
        <ModalEdit
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          modulo={marca}
          loadingSave={loadingSave}
          editar={editarmarca}
        />
        <Modal
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          modulo={marca}
          loadingSave={loadingSave}
          save={saveMarca}
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
             <TablaCabecera />
              <tbody>
                {
                  marcas.map((marca, index) => {
                    return (
                      <tr key={marca._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{marca.nombre}</td>
                        <td>{marca.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(marca.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(marca.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td>
                        <button 
                            onClick={selectMarca}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={marca._id}
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
