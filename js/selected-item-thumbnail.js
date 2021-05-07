import {
    data,
} from './modules-data.js'

// Return selected product thumbnail URL

export const selectedItemThumbnail = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    return [selectedItem.itemThumbnailURL, selectedItem.itemName]
}