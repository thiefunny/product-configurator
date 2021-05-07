import {
    generateHTML
} from './generate-html.js'

import {
    listeners
} from './listeners.js'

import {
    moduleTypesReset
} from './modules-type-reset.js'

// Reset of module types, so you can easily edit modules-data.js [add, remove or edit products]

moduleTypesReset();

// Generate HTML markup in <main class="product__configurator">

generateHTML();

// Add event listeners

listeners();