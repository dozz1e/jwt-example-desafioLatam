import { grafico } from "./setModule.js";

const getGrafico = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/total", {
      method: "GET",
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getModal = async (pais) => {
  let modalDiv = $("#contenidoModal");
  let modal = "";
  pais = pais.replace(" ", "_").toLowerCase();
  try {
    const response = await fetch(
      `http://localhost:3000/api/countries/${pais}`,
      {
        method: "GET",
      }
    );
    const { data } = await response.json();
    let arr = [];
    arr.push(data);
    grafico(arr, "cajaGrafico");
  } catch (error) {
    console.log(error);
  }
};

export { getGrafico, getModal };
