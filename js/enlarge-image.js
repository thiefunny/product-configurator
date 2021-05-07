import {
    data,
} from './modules-data.js'

// Enlarge image of product

const bigImageContainerEl = document.querySelector(".big__image__container")

export const enlargeImage = (event, moduleIndex, selectedItemIndex) => {

            bigImageContainerEl.innerHTML = `
            
            <img src="${data[moduleIndex].items[selectedItemIndex].itemImageURL}" class="big__image" alt="">
            <div class="close__gallery">&times;</div>
            `
            const closeGalleryEl = document.querySelector(".close__gallery")

            bigImageContainerEl.classList.remove("hidden");

            closeGalleryEl.onclick = function () {
                bigImageContainerEl.classList.add("hidden");
            }

            bigImageContainerEl.onclick = function () {
                bigImageContainerEl.classList.add("hidden");
            }

            // document.addEventListener('keypress', event => {
            //     console.log(event)
            //     if (event.key === 'Escape') {
            //         bigImageContainerEl.classList.add("hidden");
            //     }
            // })

        }