import { galleryItems } from "./app.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  lightboxContentEl: document.querySelector(".lightbox__content"),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalImage: document.querySelector(".lightbox__image"),
};

// Создать разметку галереи
function createGalleryItem(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `
    )
    .join("");
}

//  Cоздание галереи на основе разметки

const renderingMarkup = function (markup) {
  refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
};

renderingMarkup(createGalleryItem(galleryItems));

//  Открытие модального окна по клику в img
refs.galleryContainer.addEventListener("click", onOpenModal);

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  window.addEventListener("keydown", onEscKeyPress);
  refs.modal.classList.add("is-open");
  refs.modalImage.src = event.target.dataset.source;
  refs.modalImage.alt = event.target.alt;
}
// Закрытие модалки по Btn
refs.modalCloseBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  refs.modal.classList.remove("is-open");
  //Подмена значения атрибута src элемента img.lightbox__image
  refs.modalImage.srs = "";
  refs.modalImage.alt = "";
  refs.modalImage.id = "";
}
// Закрытие модалки по клику в Backdrop
refs.overlay.addEventListener("click", onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    console.log("Кликнули именно в бекдроп!!!!");
    onCloseModal();
  }
}

// Закрытие модалки по клику на ESC

window.addEventListener("keydown", onEscKeyPress);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

const dataSources = galleryItems.map((image) => image.original);
console.log(dataSources);

document.addEventListener("keydown", (e) => {
  const currentIndex = dataSources.indexOf(refs.modalImage.src);
  console.log(currentIndex);
  if (e.key === "ArrowLeft") {
    leftClick(currentIndex);
  } else if (e.key === "ArrowRight") {
    rightClick(currentIndex);
  }
});

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
  refs.modalImage.src = dataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  refs.modalImage.src = dataSources[nextIndex];
}
