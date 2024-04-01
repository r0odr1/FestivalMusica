document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const aboutFestival = document.querySelector(".about-festival");

  window.addEventListener("scroll", function () {
    if (aboutFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
    } else {
      barra.classList.remove("fijo");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".main-navigation a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".image-gallery");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="imagen/avif" />
      <source srcset="build/img/thumb/${i}.webp" type="imagen/webp" />
      <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
        alt="imagen galeria">
    `;
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
      <source srcset="build/img/grande/${id}.avif" type="imagen/avif" />
      <source srcset="build/img/grande/${id}.webp" type="imagen/webp" />
      <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
        alt="imagen galeria">
    `;

  // Crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  // Boton para cerra la ventana modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarModal);

  // Añadirlo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
