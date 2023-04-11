import { axiosConfig } from "../configurations/axiosConfig";

const getMarca = (estado) => {
  return axiosConfig.get("marca?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createMarca = (data={}) => {
    return axiosConfig.post("marca",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
};

const editarMarca  = (id,data) => {
  return axiosConfig.put(`marca/${id}`,data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export { getMarca, createMarca,editarMarca };
