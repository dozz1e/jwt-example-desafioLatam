var barChart,
  barPrin,
  aux = false;

const grafico = (paises, caja = "grafico") => {
  let graficoCanvas = document.getElementById(caja);
  let headerCanvas = document.getElementById("headerGrafico");

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

  if (caja != "grafico") {
    aux && barChart.destroy();
    headerCanvas.innerHTML = `<h2 class="text-center">${labels[0]}</h2>`;
    const data = {
      labels: ["Activos", "Confirmados", "Muertos", "Recuperados"],
      datasets: [
        {
          data: [actNum[0], conNum[0], mueNum[0], recNum[0]],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    };

    barChart = new Chart(graficoCanvas, {
      type: "pie",
      data: data,
    });

    aux = true;
  } else {
    var covid = {
      labels: labels,
      datasets: [activos, confirmados, muertos, recuperados],
    };

    barPrin = new Chart(graficoCanvas, {
      type: "bar",
      data: covid,
    });
  }
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
      <td><button data-toggle="modal" pais="${row.location}" data-target="#idModal" type="button" class="btn btn-danger btn-detalle">Ver Detalle</button></td>
    </tr>`;
  });
  rows += "</tbody>";
  $(`#tabla`).append(rows);
};

export { grafico, tabla };
