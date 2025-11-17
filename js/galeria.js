document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const carouselInner = document.querySelector("#lightboxCarousel .carousel-inner");
  const lightboxModal = new bootstrap.Modal(document.getElementById("lightboxModal"));

  // Generamos dinámicamente las 22 imágenes
  // IMPORTANTE: carpeta en minúsculas como en tu HTML
  const galleryData = Array.from({ length: 22 }, (_, i) => ({
    src: `img/galeria/${i + 1}.jpg`
  }));

  // Evento para cada imagen
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const startIndex = parseInt(item.getAttribute("data-index"), 10);
      buildCarousel(startIndex);
      lightboxModal.show();
    });
  });

  // Construye el carrusel empezando en la imagen clickeada
  function buildCarousel(startIndex) {
    carouselInner.innerHTML = "";

    galleryData.forEach((img, i) => {
      const isActive = i === startIndex ? "active" : "";
      const slide = `
        <div class="carousel-item ${isActive}">
          <img src="${img.src}" 
               class="d-block w-100"
               alt="Imagen ${i + 1}"
               style="object-fit: contain; max-height: 85vh;">
        </div>`;
      carouselInner.insertAdjacentHTML("beforeend", slide);
    });
  }
});
