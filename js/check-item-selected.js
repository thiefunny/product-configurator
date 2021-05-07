import {
    data,
} from './modules-data.js'

export const checkItemSelected = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    return selectedItem.itemName
}