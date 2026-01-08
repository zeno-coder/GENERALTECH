document.addEventListener("DOMContentLoaded", () => {

  // ---------- LIGHTBOX ----------
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const descBox = document.getElementById("lightbox-desc");


  if (!images.length) return;   // safety check

  let index = 0;

  images.forEach((img, i) => {
    img.addEventListener("click", () => {
      index = i;
      showImage();
    });
  });
  function animateText(text) {
  descBox.innerHTML = "";
  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animationDelay = `${i * 0.03}s`;
    descBox.appendChild(span);
  });
}


  function showImage() {
  lightbox.style.display = "flex";
  lightboxImg.src = images[index].src;

  const text = images[index].dataset.desc || "";
  animateText(text);

  lightbox.classList.remove("show-desc");
  void lightbox.offsetWidth;
  lightbox.classList.add("show-desc");

  document.body.style.overflow = "hidden";
}


  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });


  // ---------- WHATSAPP BOOKING ----------
  window.sendToWhatsApp = function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const addr = document.getElementById('address').value;
    const det = document.getElementById('details').value;
    const category = document.getElementById('category').value;

    const msg =
`New Work Request
Name: ${name}
Phone: ${phone}
Category: ${category}
Address: ${addr}
Details: ${det}`;

    const url = "https://wa.me/917909128161?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  }

});
window.openForm = function(category) {
  const overlay = document.getElementById("formOverlay");
  const popup   = overlay.querySelector(".form-popup");

  document.getElementById("category").value = category;

  overlay.style.display = "flex";

  // Force browser to apply mobile CSS first
  popup.getBoundingClientRect();

  if (window.innerWidth <= 768) {
    popup.style.animation = "sheetUp .45s ease";
    popup.style.transform = "none";
  }
}


window.closeForm = function() {
  const overlay = document.getElementById("formOverlay");
  const popup   = overlay.querySelector(".form-popup");

  overlay.style.display = "none";

  // Reset so desktop still works
  popup.style.animation = "";
  popup.style.transform = "";
}


