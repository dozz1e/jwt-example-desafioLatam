$(document).ready(async function () {
  const data = await getGrafico();
  const paises = data.filter((pais) => {
    return pais.active > 10000;
  });
  grafico(paises);
  tabla(data);
});

var barChart = "";

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

const grafico = (paises, caja = "grafico") => {
  var graficoCanvas = document.getElementById(caja);
  if (caja != "grafico" && barChart) barChart.destroy();

  let actNum = [],
    conNum = [],
    mueNum = [],
    recNum = [],
    labels = [];

  paises.forEach((pais) => {
    actNum.push(pais.active);
    conNum.push(pais.confirmed);
    mueNum.push(pais.deaths);
    recNum.push(pais.recovered);
    labels.push(pais.location);
  });

  let activos = {
    label: "Casos Activos",
    data: actNum,
    backgroundColor: "#E53935",
  };
  let confirmados = {
    label: "Casos Confirmados",
    data: conNum,
    backgroundColor: "#FDD835",
  };
  let muertos = {
    label: "Casos Muertos",
    data: mueNum,
    backgroundColor: "#E0E0E0",
  };
  let recuperados = {
    label: "Casos Recupedados",
    data: recNum,
    backgroundColor: "#00ACC1",
  };

  var covid = {
    labels: labels,
    datasets: [activos, confirmados, muertos, recuperados],
  };

  let aux = caja != "grafico" ? "barChart" : "barPrin";

  window[aux] = new Chart(graficoCanvas, {
    type: "bar",
    data: covid,
  });
};

const tabla = (data) => {
  let rows = `<thead class="thead-dark">
    <tr>
      <th class="text-left">País</th>
      <th>Confirmados</th>
      <th>Muertos</th>
      <th>Recuperados</th>
      <th>Activos</th>
      <th>Detalles</th>
    </tr>
  </thead><tbody>`;
  $.each(data, (i, row) => {
    rows += `<tr>
      <th scope="row" class="text-left">${row.location}</th>
      <td>${row.confirmed}</td>
      <td>${row.deaths}</td>
      <td>${row.recovered}</td>
      <td>${row.active}</td>
      <td><button data-toggle="modal" onclick="buscarPais('${row.location}');" data-target="#idModal" type="button" class="btn btn-danger">Ver Detalle</button></td>
    </tr>`;
  });
  rows += "</tbody>";
  $(`#tabla`).append(rows);
};

async function buscarPais(pais) {
  await getModal(pais);
}
