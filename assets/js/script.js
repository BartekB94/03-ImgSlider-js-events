const init = function () {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach(img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);
let intervalId;

const runJSSlider = function () {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider';

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function (imagesList, sliderRootElement) {
    imagesList.forEach(function (item) {
        item.addEventListener('click', function (e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });

    });

    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-img-next');
        stopInterval();
    })

    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    navPrev.addEventListener('click', function (e) {
        fireCustomEvent(e.target, 'js-slider-img-prev');
        stopInterval();
    })

    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    zoom.addEventListener('click', function (e) {
        if (e.target.classList.contains('js-slider__zoom')) {
            fireCustomEvent(e.target, 'js-slider-close');
        }
        stopInterval();
    })
}

const fireCustomEvent = function (element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent(event);
}

const initCustomEvents = function (imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function (img) {
        img.addEventListener('js-slider-img-click', function (event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const onImageClick = function (event, sliderRootElement, imagesSelector) {
    sliderRootElement.classList.add('js-slider--active')

    const clickedElement = event.target.closest('figure')
    const clickedElementImg = clickedElement.querySelector('img');
    const src = clickedElementImg.src;
    const sliderImage = document.querySelector('.js-slider__image')
    sliderImage.src = src

    const groupDataSet = event.target.dataset.sliderGroupName
    const imgElements = document.querySelectorAll(imagesSelector)
    const groupImages = [];

    imgElements.forEach(function (image) {
        if (image.dataset.sliderGroupName === groupDataSet) {
            groupImages.push(image);
        }
    });
    
    const sliderPrototype = document.querySelector('.js-slider__thumbs-item--prototype')
    let sliderThumbs = document.querySelector('.js-slider__thumbs')

    groupImages.forEach(function(figure){
        createSliderThumb(figure, src, sliderThumbs, sliderPrototype);
    })

    intervalId = setInterval(onImageNext, 5000)
}

const onImageNext = function (event) {
    console.log(this, 'onImageNext');

    const thumbParent = document.querySelector('.js-slider__thumbs')
    const prototypeFigure = thumbParent.firstElementChild
    const currentElementImg = document.querySelector('.js-slider__thumbs-image--current')
    const nextElement = currentElementImg.parentElement.nextElementSibling

    if (nextElement) {
        const nextElementImg = nextElement.querySelector('img')
        handleImage(currentElementImg, nextElementImg)
    } else {
        if (prototypeFigure.classList.contains('js-slider__thumbs-item--prototype')) {
            const nextFigure = prototypeFigure.nextElementSibling
            const nextFigureImg = nextFigure.querySelector('img')
            handleImage(currentElementImg, nextFigureImg)
        }

    }
}

const onImagePrev = function (event) {
    console.log(this, 'onImagePrev');

    const thumbParent = document.querySelector('.js-slider__thumbs')
    const lastFigure = thumbParent.lastChild
    const currentElementImg = document.querySelector('.js-slider__thumbs-image--current')
    const previousElement = currentElementImg.parentElement.previousElementSibling

    if (previousElement && !previousElement.classList.contains('js-slider__thumbs-item--prototype')) {
        const previousElementImg = previousElement.querySelector('img')
        handleImage(currentElementImg, previousElementImg)

    } else if (previousElement.classList.contains('js-slider__thumbs-item--prototype')) {
        const lastFigureImg = lastFigure.querySelector('img')
        handleImage(currentElementImg, lastFigureImg)
    }
}

const onClose = function (event) {

    const sliderActive = document.querySelector('.js-slider')
    sliderActive.classList.remove('js-slider--active')

    const sliderThumbParent = document.querySelector('.js-slider__thumbs')
    const sliderThumbsList = document.querySelectorAll('.js-slider__thumbs-item')

    sliderThumbsList.forEach(function (figure) {
        if (!figure.classList.contains('js-slider__thumbs-item--prototype'))
            sliderThumbParent.removeChild(figure)
    })
}

function handleImage(currentImg, desiredImg) {
    const thumbSrc = desiredImg.src;
    currentImg.classList.remove('js-slider__thumbs-image--current');
    desiredImg.classList.add('js-slider__thumbs-image--current');

    const sliderImage = document.querySelector('.js-slider__image');
    sliderImage.src = thumbSrc;
}

function stopInterval() {
    clearInterval(intervalId)
}

function createSliderThumb(figure, src, thumbs, prototype) {
    const thumbSrc = figure.querySelector('img').src;
    const newElement = prototype.cloneNode(true);
    const newElementImg = newElement.querySelector('img');

    newElementImg.src = thumbSrc;
    thumbs.appendChild(newElement);
    newElement.classList.remove('js-slider__thumbs-item--prototype');

    if (src === thumbSrc) {
        newElementImg.classList.add('js-slider__thumbs-image--current');
    }
}