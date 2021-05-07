import {
    data,
    moduleTypes
} from './modules-data.js'

import {
    checkItemSelected
} from './check-item-selected.js'

import {
    selectedItemThumbnail
} from './selected-item-thumbnail.js'

// Generate modules markups based on users choice

export const generateModuleMarkup = moduleIndex => {

    const moduleNumber = moduleIndex + 1;

    const generateFilter = _ => {

        let filterMarkup = '';
        const types = [];

        data[moduleIndex].items.forEach(item => {
            if (!types.includes(item.itemType)) {
                types.push(item.itemType);
            }
        })

        types.forEach(type => {
            filterMarkup += `
            <li class="filter__item">${type}</li>
            `
        })
        return filterMarkup;
    }

    const generateItemsGrid = _ => {

        let gridMarkup = '';

        data[moduleIndex].items.forEach(item => {
            gridMarkup += `
            <li class="item ${item.itemType}">
                <div class="item__image item__child">
                    <img src="${item.itemThumbnailURL}" alt="" class="thumbnail__img">
                <img src="img/loupe.svg" alt="" class="item__image__loupe">
                </div>
                <div class="item__title item__child">${item.itemName}</div>
            </li>`

        })
        return gridMarkup;
    }

    if (data[moduleIndex].moduleType === moduleTypes[2]) {
        return `
        
        <article class="module__box module__type__three">
        <div class="module__nav module__type__three__nav">
            
                <div class="module__title type__three">
                    <div class="module__number">${moduleNumber}.</div> ${data[moduleIndex].title}
                <div class="item__name">${checkItemSelected(moduleIndex)}</div>

                </div>
            
            <!-- <div class="module__type__three__nav__right"> -->
                <div class="thumbnail"><img src="${selectedItemThumbnail(moduleIndex)}" alt="" class="thumbnail__img"></div>
                <div class="module__step__type">${data[moduleIndex].moduleType}</div>
            <!-- </div> -->
        </div>
        </article>
        
        `
    }

    if (data[moduleIndex].moduleType === moduleTypes[1]) {
        return `
        
        <article class="module__box module__type__two">
        <div class="module__nav module__type__two__nav">
            <div class="module__title type__two">
                <div class="module__number">${moduleNumber}.</div> ${data[moduleIndex].title}
            </div>
            <div class="module__step__type">Wybieram</div>
        </div>
        <div class="module__filter module__type__two__filter">
        <ul class="filter__list">
        <li class="filter__item">Wszystkie</li>
            ${generateFilter()}
            </ul>
        </div>
        <div class="module__content module__type__two__content">
            <ul class="items__grid">
            ${generateItemsGrid()}    
            </ul>
        </div>
    </article>
        
        `
    }

    if (data[moduleIndex].moduleType === moduleTypes[0]) {
        return `
        
        <article class="module__box module__type__one">
            <div class="module__nav module__type__one__nav">
                <div class="module__title type__one">
                    <div class="module__number">${moduleIndex+1}.</div> ${data[moduleIndex].title}
                </div>
                <div class="module__step__type">Wybierz</div>
            </div>
        </article>
        `
    }

}