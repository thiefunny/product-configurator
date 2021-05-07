import {
    data,
} from './modules-data.js'

export const selectedItemThumbnail = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    // console.log(selectedItem)
    // console.log(selectedItem.itemThumbnailURL)
    return selectedItem.itemThumbnailURL
}