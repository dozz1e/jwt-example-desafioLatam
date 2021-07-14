$(document).ready(async function () {
  const data = await getGrafico();
  const paises = data.filter((pais) => {
    return pais.active > 10000;
  });
  console.log(paises);
  grafico(paises);
  tabla(paises);
});

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

const grafico = (paises) => {
  var graficoCanvas = document.getElementById("grafico");
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

  var barChart = new Chart(graficoCanvas, {
    type: "bar",
    data: covid,
  });
};

const tabla = (data, table) => {
  let rows = `<thead>
    <th>
      <td>País</td>
      <td>Confirmados</td>
      <td>Muertos</td>
      <td>Recuperados</td>
      <td>Activos</td>
      <td>Detalles</td>
    </th>
  </thead><tbody>`;
  $.each(data, (i, row) => {
    rows += `<tr>
      <td>${row.location}</td>
      <td>${row.confirmed}</td>
      <td>${row.deaths}</td>
      <td>${row.recovered}</td>
      <td>${row.active}</td>
      <td><button>Ver Detalle</button></td>
    </tr>`;
  });
  rows += "</tbody>";
  $(`#tabla`).append(rows);
};
