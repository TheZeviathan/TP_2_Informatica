// galeria.js
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const carouselInner = document.querySelector("#lightboxCarousel .carousel-inner");
  const lightboxModal = new bootstrap.Modal(document.getElementById("lightboxModal"));

  // Generamos dinámicamente las 22 imágenes sin título ni descripción
  const galleryData = Array.from({ length: 22 }, (_, i) => ({
    src: `Img/Galeria/${i + 1}.jpg`
  }));

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const startIndex = parseInt(item.getAttribute("data-index"), 10);
      buildCarousel(startIndex);
      lightboxModal.show();
    });
  });

  function buildCarousel(startIndex) {
    carouselInner.innerHTML = "";

    galleryData.forEach((img, i) => {
      const isActive = i === startIndex ? "active" : "";
      const slide = `
        <div class="carousel-item ${isActive}">
          <img src="${img.src}" 
               class="d-block w-100" 
               alt=""
               style="object-fit: contain; object-position: center 40%; max-height: 80vh;">
        </div>`;
      carouselInner.insertAdjacentHTML("beforeend", slide);
    });
  }
});
