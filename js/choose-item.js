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

export const chooseItem = (event, moduleIndex, selectedItemIndex) => {

    // console.log(data[moduleIndex])
    // console.log(data[moduleIndex].items)

    for (let elem of data[moduleIndex].items) {
        elem.itemSelected = false;
    }

    data[moduleIndex].items[selectedItemIndex].itemSelected = true;
    data[moduleIndex].edited = true;
    data[moduleIndex].moduleType = moduleTypes[2];

    generateHTML();
    listeners();

}