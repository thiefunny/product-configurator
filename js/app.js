import {
    data,
    moduleTypes
} from './modules-data.js'

let moduleTitleEls, moduleStepTypeEls, filterItemEls, modulesArr, allItems, itemChildren, thumbnails, loupes;

const productConfigurator = document.querySelector('.product__configurator');

const checkItemSelected = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    return selectedItem.itemName
}

const selectedItemThumbnail = moduleIndex => {
    let selectedItem;
    selectedItem = data[moduleIndex].items.find(item => item.itemSelected === true)
    return selectedItem.itemThumbnailURL
}

const generateModuleMarkup = moduleIndex => {

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
                <img src="img/sample_img.png" alt="" class="item__image__loupe">
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

const generateHTML = _ => {

    let markup = '';

    data.forEach(module => {
        markup += generateModuleMarkup(data.indexOf(module));;
    })

    productConfigurator.innerHTML = `${markup}`

    moduleTitleEls = [...document.querySelectorAll(".module__title")];
    moduleStepTypeEls = [...document.querySelectorAll(".module__step__type")];
    filterItemEls = document.querySelectorAll(".filter__item");
    modulesArr = [...document.querySelectorAll('.module__box')];
    allItems = [...document.getElementsByClassName(`item`)]
    itemChildren = [...document.getElementsByClassName(`item__child`)]
    thumbnails = [...document.getElementsByClassName(`thumbnail__img`)]
    loupes = [...document.getElementsByClassName(`item__image__loupe`)]

}


const moduleSwitch = event => {

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

const chooseItem = (event, moduleIndex, selectedItemIndex) => {

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

const listeners = _ => {

    // Switching modules

    for (let moduleTitle of moduleTitleEls) {
        moduleTitle.addEventListener('click', event => {
            moduleSwitch(event)
        })
    }

    for (let moduleStepType of moduleStepTypeEls) {
        moduleStepType.addEventListener('click', event => {
            moduleSwitch(event)
        })
    }

    // Filter by CSS display

    for (let filterItem of filterItemEls) {
        filterItem.addEventListener('click', event => {

            const typeFiltered = event.target.innerHTML;
            const filteredItems = [...document.getElementsByClassName(`item ${typeFiltered}`)]

            allItems.forEach(item => item.classList.add("hidden"));
            filteredItems.forEach(item => item.classList.remove("hidden"));

            if (typeFiltered === 'Wszystkie') {
                allItems.forEach(item => item.classList.remove("hidden"));
            }
        })
    }

    // Select item

    for (let itemChild of itemChildren) {

        itemChild.addEventListener('click', event => {

            let selectedItemIndex = allItems.indexOf(event.target.parentNode);
            let moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode);
            chooseItem(event, moduleIndex, selectedItemIndex)
            // console.log(selectedItemIndex)
            // console.log(moduleIndex)



        })
    }

    // console.log(thumbnails)


    for (let thumbnail of thumbnails) {

        thumbnail.addEventListener('click', event => {

            let selectedItemIndex = allItems.indexOf(event.target.parentNode.parentNode);

            // console.log(selectedItemIndex)

            let moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

            // console.log(moduleIndex)

            chooseItem(event, moduleIndex, selectedItemIndex)

        })
    }

    // Enlarge image

    for (let loupe of loupes) {

        loupe.addEventListener('click', event => {

            const bigImageContainerEl = document.querySelector(".big__image__container")
            const closeGalleryEl = document.querySelector(".close__gallery")
            bigImageContainerEl.classList.remove("hidden");

            closeGalleryEl.onclick = function () {
                bigImageContainerEl.classList.add("hidden");
            }
        })
    }
}

generateHTML();
listeners();