// import {
//     tempEl
// } from './dom-cache.js'
import {
    data,
    moduleTypes
} from './modules-data.js'


const productConfigurator = document.querySelector('.product__configurator');

const checkItemPicked = _ => {

}

const pickedItemThumbnail = _ => {
    return data[0].items[0].itemThumbnailURL
}

let markup = '';

const generateModuleMarkup = moduleIndex => {

const moduleNumber = moduleIndex+1;

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
            <li class="item">
                <div class="item__image"><img src="${item.itemThumbnailURL}" alt="" class="thumbnail-img">
                            <div class="item__image__loupe"><img src="img/sample_img.png" alt="" class="loupe-img"></div>
                </div>
                <div class="item__title">${item.itemName}</div>
            </li>`

        })

        return gridMarkup;


    }

    if (data[moduleIndex].moduleType === moduleTypes[2]) {
        return `
        
        <article class="module__box module__type__one">
        <div class="module__nav module__type__one__nav">
            <div class="module__type__one__nav__left">
                <div class="module__title">
                    <div class="module__number">${moduleNumber}.</div> ${data[moduleIndex].title}
                </div>
                <div class="item__name">${checkItemPicked()}</div>
            </div>
            <div class="module__type__one__nav__right">
                <div class="thumbnail"><img src="${pickedItemThumbnail()}" alt="" class="thumbnail-img"></div>
                <div class="module__step__type">${data[moduleIndex].moduleType}</div>
            </div>
        </div>
        </article>
        
        `
    }

    if (data[moduleIndex].moduleType === moduleTypes[1]) {
        return `
        
        <article class="module__box module__type__two">
        <div class="module__nav module__type__two__nav">
            <div class="module__title">
                <div class="module__number">${moduleNumber}.</div> ${data[moduleIndex].title}
            </div>
            <div class="module__step__type">Wybieram</div>
        </div>
        <div class="module__filter module__type__two__filter">
        <ul class="filter__list">
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
        
        <article class="module__box module__type__three">
            <div class="module__nav module__type__three__nav">
                <div class="module__title">
                    <div class="module__number">${moduleIndex+1}.</div> ${data[moduleIndex].title}
                </div>
                <div class="module__step__type">Wybierz</div>
            </div>
        </article>
        `
    }

}

data.forEach(module => {
    markup += generateModuleMarkup(data.indexOf(module));;
})

productConfigurator.innerHTML = `

${markup}


`