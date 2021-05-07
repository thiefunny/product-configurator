import {
    data,
} from './modules-data.js'

import {
    generateModuleMarkup
} from './generate-module-markup.js'

// Generate HTML markup in <main class="product__configurator"> based on modules markups

const productConfigurator = document.querySelector('.product__configurator');

export const generateHTML = _ => {

    let markup = '';

    data.forEach(module => {
        markup += generateModuleMarkup(data.indexOf(module));
    })

    productConfigurator.innerHTML = `${markup}`

}