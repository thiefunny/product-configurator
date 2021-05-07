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

export const moduleSwitch = event => {

    const modulesArr = [...document.querySelectorAll('.module__box')];


    const moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode);

    for (let elem of data) {
        if (elem.edited === true && elem.moduleType !== moduleTypes[0]) {
            elem.moduleType = moduleTypes[2]
        } else {
            elem.moduleType = moduleTypes[0]
        }
    }

    if (data[moduleIndex].moduleType === moduleTypes[0]) {
        data[moduleIndex].moduleType = moduleTypes[1]
    }

    if (data[moduleIndex].moduleType === moduleTypes[2]) {
        data[moduleIndex].moduleType = moduleTypes[1]
    }

    generateHTML();
    listeners();

}