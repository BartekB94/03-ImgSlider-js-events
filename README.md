See the live version of [Image Slider](https://bartekb94.github.io/03-ImgSlider-js-events/)


###   Features
- choosing group of images and displaying them as a slider
- changing image by clicking "Next/Previous" button
- photos are switched automatically as a slide show

---

### Code Fragments

```
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
```


---

## 🙋‍♂️ Feel free to contact me
Write sth nice ;) Find me on   <a href="https://www.linkedin.com/in/bartekb94/" target="_blank">
    <img align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" />
  </a>

&nbsp;

## 👏 Thanks / Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.
