import {
    data,
    moduleTypes
} from './modules-data.js'

export const moduleTypesReset = _ => {
    data.forEach(module => {
        module.moduleType = moduleTypes[0];
    })
}