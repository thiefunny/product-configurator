import {
    chooseItem
} from './choose-item.js'

import {
    moduleSwitch
} from './module-switch.js'

import {
    enlargeImage
} from './enlarge-image.js'

// Event listeners for all required elements

export const listeners = _ => {

    const moduleTitleEls = [...document.querySelectorAll(".module__title")];
    const moduleStepTypeEls = [...document.querySelectorAll(".module__step__type")];
    const filterItemEls = document.querySelectorAll(".filter__item");
    const modulesArr = [...document.querySelectorAll('.module__box')];
    const allItems = [...document.getElementsByClassName(`item`)]
    const itemChildren = [...document.getElementsByClassName(`item__child`)]
    const thumbnails = [...document.getElementsByClassName(`thumbnail__img`)]
    const loupes = [...document.getElementsByClassName(`item__image__loupe`)]

    // Switching modules

    for (let moduleTitle of moduleTitleEls) {
        moduleTitle.addEventListener('click', event => {
            moduleSwitch(event)
        })
    }

    for (let moduleStepType of moduleStepTypeEls) {
        moduleStepType.addEventListener('click', event => {
            moduleSwitch(event)
        })
    }

    // Filtering items by CSS display

    for (let filterItem of filterItemEls) {

        filterItem.addEventListener('click', event => {

            const typeFiltered = event.target.innerHTML;
            const filteredItems = [...document.getElementsByClassName(`item ${typeFiltered}`)]

            for (let filterItem of filterItemEls) {
                filterItem.classList.remove("filter__active");
            }

            filterItem.classList.add("filter__active");

            allItems.forEach(item => item.classList.add("hidden"));
            filteredItems.forEach(item => item.classList.remove("hidden"));

            if (typeFiltered === 'Wszystkie') {
                allItems.forEach(item => item.classList.remove("hidden"));
            }
        })
    }

    // Select item

    for (let itemChild of itemChildren) {

        itemChild.addEventListener('click', event => {

            let selectedItemIndex = allItems.indexOf(event.target.parentNode);
            let moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode);
            chooseItem(event, moduleIndex, selectedItemIndex)
            // console.log(selectedItemIndex)
            // console.log(moduleIndex)



        })
    }

    // console.log(thumbnails)

    for (let thumbnail of thumbnails) {

        thumbnail.addEventListener('click', event => {

            let selectedItemIndex = allItems.indexOf(event.target.parentNode.parentNode);

            // console.log(selectedItemIndex)

            let moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

            // console.log(moduleIndex)

            chooseItem(event, moduleIndex, selectedItemIndex)

        })
    }

    // Enlarge image after clicking on loupe

    for (let loupe of loupes) {

        loupe.addEventListener('click', event => {

            let selectedItemIndex = allItems.indexOf(event.target.parentNode.parentNode);

            // console.log(selectedItemIndex)

            let moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

            enlargeImage(event, moduleIndex, selectedItemIndex)

        })
    }
}