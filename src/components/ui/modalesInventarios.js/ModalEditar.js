import React from 'react'

export default function ModalEditar({
    title,
    closeModal,
    handleChange,
    modulo,
    loadingSave,
    editar
}) {
  return (
    <div className="modal fade" id="exampleModalEdit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">editar {title}</h1>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                serial:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="serial"
                onChange={handleChange}
                value={modulo.serial}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
               Modelo:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="modelo"
                onChange={handleChange}
                value={modulo.modelo}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
               descripción:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="descripcion"
                onChange={handleChange}
                value={modulo.descripcion}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
              Foto:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="foto"
                onChange={handleChange}
                value={modulo.foto}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
               Color:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="color"
                onChange={handleChange}
                value={modulo.color}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Fecha Compra:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="fechaCompra"
                onChange={handleChange}
                value={modulo.fechaCompra}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                precio:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="precio"
                onChange={handleChange}
                value={modulo.precio}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
               Usuario:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="usuario"
                onChange={handleChange}
                value={modulo.usuario.nombre}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                marca:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="marca"
                onChange={handleChange}
                value={modulo.marca.nombre}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Estado:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="estado"
                onChange={handleChange}
                value={modulo.estado.nombre}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
               tipoEquipo:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="tipoEquipo"
                onChange={handleChange}
                value={modulo.tipoEquipo.nombre}
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
          {
            loadingSave 
            ? 
            (
            <button 
              className="btn btn-primary" 
              type="button" disabled
            >
              <span 
                className="spinner-grow spinner-grow-sm" 
                role="status" 
                aria-hidden="true"
                
              >
              </span>

                Guardando...
            </button>
            ) : 
            (
            <button 
              type="button" 
              className="btn btn-primary"

              onClick={editar}
              closeModal
             
              
            >
              
            Enviar
            </button>
            )
          }
        </div>
      </div>
    </div>
  </div>
  )
}
