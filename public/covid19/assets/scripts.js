import { getGrafico, getModal } from "./modulos/getModule.js";
import { grafico, tabla } from "./modulos/setModule.js";

$(document).ready(async function () {
  const data = await getGrafico();
  const paises = data.filter((pais) => {
    return pais.active > 10000;
  });
  grafico(paises);
  tabla(data);
});

$(document).on("click", ".btn", async function () {
  await getModal($(this).attr("pais"));
});
