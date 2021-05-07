import {
    data,
} from './modules-data.js'

import {
    generateModuleMarkup
} from './generate-module-markup.js'

const productConfigurator = document.querySelector('.product__configurator');
let filterItemEls, modulesArr, allItems, itemChildren, thumbnails, loupes;

export const generateHTML = _ => {

    let markup = '';

    data.forEach(module => {
        markup += generateModuleMarkup(data.indexOf(module));
    })

    productConfigurator.innerHTML = `${markup}`

    filterItemEls = document.querySelectorAll(".filter__item");
    modulesArr = [...document.querySelectorAll('.module__box')];
    allItems = [...document.getElementsByClassName(`item`)]
    itemChildren = [...document.getElementsByClassName(`item__child`)]
    thumbnails = [...document.getElementsByClassName(`thumbnail__img`)]
    loupes = [...document.getElementsByClassName(`item__image__loupe`)]

}