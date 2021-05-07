import {
    data,
} from './modules-data.js'

// Check which product is selected by user

export const checkItemSelected = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    return selectedItem.itemName
}