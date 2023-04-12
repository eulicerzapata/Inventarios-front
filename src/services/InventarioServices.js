import { axiosConfig } from "../configurations/axiosConfig";

const getInventarios = (estado) => {
  return axiosConfig.get("inventario?estado="+estado , {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createInventarios = (data={}) => {
    return axiosConfig.post("inventario",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

const editarInventarios  = (id,data) => {
  return axiosConfig.put(`inventario/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export { getInventarios, createInventarios,editarInventarios };
