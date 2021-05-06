import {
    data,
    moduleTypes
} from './modules-data.js'


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
}


generateHTML();

productConfigurator.addEventListener('click', event => {

    // console.log(event.target)

    const modulesArr = [...document.querySelectorAll('.module__box')];
    const allItems = [...document.getElementsByClassName(`item`)]

    // Module's visibility

    if (event.target.classList.contains("module__title") || event.target.classList.contains("module__step__type")) {

        const moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode)

        for (let elem of data) {

            if (elem.edited === true && elem.moduleType !== moduleTypes[0]) {
                elem.moduleType = moduleTypes[2]
            } else(elem.moduleType = moduleTypes[0])
        }

        if (data[moduleIndex].moduleType === moduleTypes[0]) {
            data[moduleIndex].moduleType = moduleTypes[1]
        }

        if (data[moduleIndex].moduleType === moduleTypes[2]) {
            data[moduleIndex].moduleType = moduleTypes[1]
        }

        generateHTML();
    }

    // Filter by CSS display

    if (event.target.classList.contains("filter__item")) {
        const filterItems = [...event.target.parentNode.children];

        const typeFiltered = event.target.innerHTML;
        const filteredItems = [...document.getElementsByClassName(`item ${typeFiltered}`)]

        allItems.forEach(item => item.classList.add("hidden"));
        filteredItems.forEach(item => item.classList.remove("hidden"));

        if (typeFiltered === 'Wszystkie') {
            allItems.forEach(item => item.classList.remove("hidden"));

        }
    }

    // Select item

    if (event.target.classList.contains("item__child")) {
        const selectedItemIndex = allItems.indexOf(event.target.parentNode);
        const moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode);
        const selectedItemEl = event.target.parentNode;

        for (let elem of data[moduleIndex].items) {
            elem.itemSelected = false;
        }
        data[moduleIndex].items[selectedItemIndex].itemSelected = true;
        data[moduleIndex].edited = true;
        data[moduleIndex].moduleType = moduleTypes[2];
        generateHTML();

    } else if (event.target.classList.contains("thumbnail__img")) {
        const selectedItemIndex = allItems.indexOf(event.target.parentNode.parentNode);
        const moduleIndex = modulesArr.indexOf(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

        for (let elem of data[moduleIndex].items) {
            elem.itemSelected = false;
        }
        data[moduleIndex].items[selectedItemIndex].itemSelected = true;
        data[moduleIndex].edited = true;
        data[moduleIndex].moduleType = moduleTypes[2];
        generateHTML();

    }

    // Enlarge image

    if (event.target.classList.contains("item__image__loupe")) {
        const bigImageContainerEl = document.querySelector(".big__image__container")
        const closeGalleryEl = document.querySelector(".close__gallery")
        bigImageContainerEl.classList.remove("hidden");
        
        closeGalleryEl.onclick = function() {bigImageContainerEl.classList.add("hidden");}

    }

})

const moduleTitleEls = [...document.querySelectorAll(".module__title")];
const moduleStepTypeEl = document.querySelector(".module__step__type");
const filterListEl = document.querySelector(".filter__list");
const filterItemEls = document.querySelectorAll(".filter__item");
const itemEls = document.querySelectorAll(".item");