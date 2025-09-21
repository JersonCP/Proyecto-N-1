// 📂 app.js
// Lógica en JavaScript para el Gestor de Películas

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("movieForm");
  const tableBody = document.getElementById("movieTableBody");

  let movies = [];

  function renderMovies() {
    tableBody.innerHTML = "";
    movies.forEach((movie, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.year}</td>
        <td>${movie.rating}</td>
        <td>${movie.comment}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // Eventos de editar y eliminar
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        movies.splice(i, 1);
        renderMovies();
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        const movie = movies[i];
        document.getElementById("title").value = movie.title;
        document.getElementById("genre").value = movie.genre;
        document.getElementById("year").value = movie.year;
        document.getElementById("rating").value = movie.rating;
        document.getElementById("comment").value = movie.comment;

        movies.splice(i, 1); // eliminar mientras se edita
        renderMovies();
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const year = document.getElementById("year").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value.trim();

    if (!title || !genre || !year || !rating) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const yearNum = parseInt(year);
    const ratingNum = parseInt(rating);
    if (yearNum < 1900 || yearNum > 2100 || ratingNum < 1 || ratingNum > 10) {
      alert("Verifica que el año y la calificación sean válidos.");
      return;
    }

    movies.push({ title, genre, year: yearNum, rating: ratingNum, comment });
    form.reset();
    renderMovies();
  });
});
