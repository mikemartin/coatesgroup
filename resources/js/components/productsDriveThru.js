
import Swiper from 'swiper';
import { Navigation, A11y, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';
import 'swiper/css/effect-fade';

Swiper.use([Navigation, A11y, EffectFade]);

export default () => ({
    swiper: null,
    activeSlide: 0,
    init() {
        this.swiper = new Swiper(this.$refs.container, {
            slidesPerView: 1,
            spaceBetween: 10,
            edgeSwipeDetection: 'prevent',
            updateOnWindowResize: true,
            a11y: true,
            cssMode: true,
            passiveListeners: true,
            effect: 'fade',
            loop: false,
            fadeEffect: {           
              crossFade: true
            },
            centeredSlides: true,
            navigation: {
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            },
            on: {
              slideChange: () => { this.activeSlide = this.swiper.activeIndex }
            }
        })
    },
})