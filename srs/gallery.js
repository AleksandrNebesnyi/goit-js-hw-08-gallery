import { galleryItems } from "./app.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  lightboxContentEl: document.querySelector(".lightbox__content"),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalImage: document.querySelector(".lightbox__image"),
};
// console.log(refs.overlay);
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

// Cоздание галереи на основе разметки

const renderingMarkup = function (markup) {
  refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
};

// Создание галереи
renderingMarkup(createGalleryItem(galleryItems));
// Открытие модального окна по клику в img

refs.galleryContainer.addEventListener("click", onOpenModal);

const onOpenModal = function (event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modal.classList.add("is-open");
  console.log("Modal is open");
};

// refs.overlay.addEventListener("click", onBackdropClick);
// refs.modalCloseBtn.addEventListener("click", onCloseModal);

// const onCloseModal = function () {
//   if (refs.modal.classList.contains("is-open")) {
//     refs.modal.classList.remove("is-open");
//     console.log("function onCloseModal");
//   }
// };

// const onBackdropClick = function (event) {
//   if (event.currentTarget === event.target) {
//     console.log("Кликнули именно в бекдроп!!!!");
//     onCloseModal();
//   }
// };

// window.addEventListener("keydown", (evt) => {
//   if (evt.code === "Escape") onCloseModal();
// });

// refs.closeModalBtn.addEventListener("click", onCloseModal);
// refs.backdrop.addEventListener("click", onBackdropClick);

// function onOpenModal() {
//   window.addEventListener('keydown', onEscKeyPress);
//   document.body.classList.add('show-modal');
// }

// function onCloseModal() {
//   window.removeEventListener('keydown', onEscKeyPress);
//   document.body.classList.remove('show-modal');
// }

// function onBackdropClick(event) {
//   if (event.currentTarget === event.target) {
//     console.log('Кликнули именно в бекдроп!!!!');
//     onCloseModal();
//   }
// }

// function onEscKeyPress(event) {
//   const ESC_KEY_CODE = 'Escape';
//   const isEscKey = event.code === ESC_KEY_CODE;

//   if (isEscKey) {
//     onCloseModal();
//   }

// creatingMarkup(createGalleryItem(galleryItems));

// console.log(creatingMarkup(createGalleryItem(galleryItems)));

// //Слушатель клика на контейнере
// refGalleryContainer.addEventListener('click', onImageClick);

// //Слушатель Закрытие модалки по кнопке
// refModalCloseBtn.addEventListener('click', onCloseModal);

// //Слушатель Закрытие модалки по Overlay
// refModalOverlay.addEventListener('click', onCloseModal);

// //Слушатель Закрытие подалки по Esc
// window.addEventListener('keydown', evt =>
// {
//     if(evt.code === "Escape") onCloseModal();
// });

// //Слушатель Перелистывание галереи при открытом модальном окне
// refGalleryContainer.addEventListener('keydown', onFlippingGallery);
