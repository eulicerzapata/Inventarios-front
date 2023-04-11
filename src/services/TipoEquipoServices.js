import { axiosConfig } from "../configurations/axiosConfig";

const getTipoEquipos = (estado) => {
  return axiosConfig.get("tipoequipos?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createTipoEquipo = (data={}) => {
    return axiosConfig.post("tipoequipos",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

const borrarTipoEquipo = (id) => {
  return axiosConfig.delete(`tipoequipos/${id}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


const editarTipoEquipo  = (id,data) => {
    return axiosConfig.put(`tipoequipos/${id}`,data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

export { getTipoEquipos, createTipoEquipo,borrarTipoEquipo, editarTipoEquipo  };
