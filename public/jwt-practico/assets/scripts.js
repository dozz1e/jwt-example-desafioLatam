$(document).ready(function () {
  $("#js-form").submit(async (e) => {
    e.preventDefault();
    const email = $("#js-input-email").val();
    const password = $("#js-input-password").val();
    const JWT = await postData(email, password);
    const posts = await getPost(JWT);
    fillTable(posts, "js-table-posts");
    toggleFormAndTable("js-form-wrapper", "js-table-wrapper");
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
    console.log(error);
  }
};

const getPost = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fillTable = (data, table) => {
  let rows = "";
  $.each(data, (i, row) => {
    rows += `<tr>
      <td>${row.title}</td>
      <td>${row.body}</td>
    </tr>`;
  });
  $(`#${table} tbody`).append(rows);
};

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle();
  $(`#${table}`).toggle();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    const posts = await getPost(token);
    fillTable(posts, "js-table-posts");
    toggleFormAndTable("js-form-wrapper", "js-table-wrapper");
  }
};
init();
