import { axiosConfig } from "../configurations/axiosConfig";

const getEstados = (estado) => {
  return axiosConfig.get("estadoequipo?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createEstados = (data={}) => {
    return axiosConfig.post("nombre","email",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

const editarEstado  = (id,data) => {
  return axiosConfig.put(`estadoequipo/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export { getEstados, createEstados, editarEstado };
