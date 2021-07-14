$(document).ready(function () {
  $("#js-form").submit(async (e) => {
    e.preventDefault();
    const email = $("#js-input-email").val();
    const password = $("#js-input-password").val();
    const JWT = await postData(email, password);
    const posts = await getPost(JWT);
    if (posts) {
      instaFake(posts, "js-resultado__container");
      toggleFormAndTable("js-formulario", "js-resultado");
    } else {
      alert("Debe ingresar un usuario o contraseña correcta");
    }
  });
});

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (error) {
    localStorage.clear();
    console.log(error);
  }
};

const getPost = async (jwt, pagina = 1) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/photos?page=${pagina})`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    localStorage.clear();
    console.log(error);
  }
};

const instaFake = (data, lugar) => {
  let cards = "";
  $.each(data, (i, row) => {
    cards += `<div class="card m-5">
      <img src="${row.download_url}" class="card-img-top" alt="${row.author}" />
      <div class="card-body">
        <h5 class="card-title">${row.author}</h5>
      </div>
    </div>`;
  });
  cards += `<button id="masData()">Cargar más Fotos</button>`;
  $(`#${lugar}`).html(cards);
};

const masData = async (indice) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    const posts = await getPost(token, indice);
    if (posts) {
      instaFake(posts, "js-resultado__container");
    } else {
      alert("No hay más Imágenes");
    }
  }
};

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).removeClass("d-block").addClass("d-none");
  $(`#${table}`).removeClass("d-none").addClass("d-block");
};

const cerrar = () => {
  localStorage.clear();
  location.reload();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    const posts = await getPost(token);
    instaFake(posts, "js-resultado__container");
    toggleFormAndTable("js-formulario", "js-resultado");
  }
};
init();
