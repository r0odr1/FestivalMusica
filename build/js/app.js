document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
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

    galeria.appendChild(imagen);
  }
}
