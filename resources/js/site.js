import ui from '@alpinejs/ui'
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import morph from '@alpinejs/morph'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'
import 'focus-visible'
import Swiper from 'swiper';
import { Pagination, Navigation, Mousewheel, A11y, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/mousewheel';
import fadeIn from './components/fadeIn.js'
import horizontalLoop from './components/horizontalLoop.js'


Swiper.use([Pagination, Navigation, Mousewheel, A11y, FreeMode, Thumbs]);


// Global get CSRF token function (used by forms).
window.getToken = async () => {
    return await fetch('/!/statamic-peak-tools/dynamic-token/refresh')
        .then((res) => res.json())
        .then((data) => {
            return data.csrf_token
        })
        .catch((error) => {
            this.error = 'Something went wrong. Please try again later.'
        })
}

// Masonry Support
// https://techhub.iodigital.com/articles/why-you-should-be-using-new-css-features-today/why-you-should-be-using-new-css-features-today-part-2
const supportMasonry = CSS.supports('grid-template-rows', 'masonry')

if (!supportMasonry) {
    let grids = [...document.querySelectorAll('.grid[data-rows="masonry"]')];
}

// Call Alpine.
window.Alpine = Alpine
window.Swiper = Swiper;

Alpine.plugin([ui, collapse, focus, morph, persist, intersect])
Alpine.data('fadeIn', fadeIn)
Alpine.data('horizontalLoop', horizontalLoop)
Alpine.start()

