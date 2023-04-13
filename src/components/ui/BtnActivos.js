import React from 'react'
import "../../css/botones.css"

export default function BtnActivos({
    query,
    changeSwitch
}) {
  return (
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
  )
}
