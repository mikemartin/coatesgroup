import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs'
import ui from '@alpinejs/ui'
import collapse from '@alpinejs/collapse'
import morph from '@alpinejs/morph'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'
import screen from '@victoryoalli/alpinejs-screen'
import sticky from 'alpinejs-sticky'
import queryString from "@invoate/alpine-query-string"
import fadeIn from './components/fadeIn.js'
import 'focus-visible'

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

window.Alpine = Alpine

AsyncAlpine.init(Alpine)
    .data('horizontalLoop', () => import('./components/horizontalLoop.js'))
    .data('squareDivider', () => import('./components/squareDivider.js'))
    .data('masonryGrid', () => import('./components/masonryGrid.js'))
    .data('animatedRender', () => import('./components/animatedRender.js'))
    .data('animatedSoftware', () => import('./components/animatedSoftware.js'))
    .data('valuesCarousel', () => import('./components/valuesCarousel.js'))
    .data('tabSections', () => import('./components/tabSections.js'))
    .data('linkBlockCarousel', () => import('./components/linkBlockCarousel.js'))
    .data('blockCarousel', () => import('./components/blockCarousel.js'))
    .data('galleryCarousel', () => import('./components/galleryCarousel.js'))
    .data('productsCarousel', () => import('./components/productsCarousel.js'))
    .data('productsDriveThru', () => import('./components/productsDriveThru.js'))
    .data('caseStudies', () => import('./components/caseStudies.js'))
    .start();

Alpine.plugin([ui, collapse, focus, morph, persist, intersect, screen, sticky, queryString]);
Alpine.data('fadeIn', fadeIn);
Alpine.start();

