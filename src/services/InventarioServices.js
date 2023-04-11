import { axiosConfig } from "../configurations/axiosConfig";

const getInventarios = (estado) => {
  return axiosConfig.get("inventario" , {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createInventarios = (data={}) => {
    return axiosConfig.post("marca",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

const editarInventarios  = (id,data) => {
  return axiosConfig.put(`marca/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export { getInventarios, createInventarios,editarInventarios };
