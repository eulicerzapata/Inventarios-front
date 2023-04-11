import { axiosConfig } from "../configurations/axiosConfig";

const getUsuarios = (estado) => {
  return axiosConfig.get("usuario?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createUsuario = (data={}) => {
    return axiosConfig.post("usuario",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};
const editarUsuarios  = (id,data) => {
  return axiosConfig.put(`usuario/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export { getUsuarios, createUsuario , editarUsuarios};
