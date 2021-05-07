import {
    data,
    moduleTypes
} from './modules-data.js'

import {
    generateHTML
} from './generate-html.js'
import {
    listeners
} from './listeners.js'

// Change specific product/item Object properties based on chosen product

export const chooseItem = (moduleIndex, selectedItemIndex) => {

    let items = data[moduleIndex].items;

    for (let item of items) {
        item.itemSelected = false;
    }

    data[moduleIndex].items[selectedItemIndex].itemSelected = true;
    data[moduleIndex].edited = true;
    data[moduleIndex].moduleType = moduleTypes[2];

    generateHTML();
    listeners();

}