import Swiper from 'swiper';
import { Mousewheel, A11y, FreeMode, Thumbs} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/mousewheel';

Swiper.use([Mousewheel, A11y, FreeMode, Thumbs]);


export default () => ({
    swiper: null,
    thumbs: null,
    activeSlide: 0,
    init() {
        this.thumbs = new Swiper(this.$refs.thumbs, {
            slidesPerView: 'auto',
            spaceBetween: 32,
            freeMode: true,
            multipleActiveThumbs: false,
            passiveListeners: true,
            mousewheel: {
                enabled: true,
                forceToAxis: true,
            },
            a11y: true,
            breakpoints: {
                640: {
                    spaceBetween: 50
                }
            },
        });

        this.swiper = new Swiper(this.$refs.container, {
            slidesPerView: 1,
            spaceBetween: 20,
            edgeSwipeDetection: 'prevent',
            updateOnWindowResize: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            a11y: true,
            freeMode: true,
            passiveListeners: true,
            mousewheel: {
              enabled: true,
              forceToAxis: true,
            },
            breakpoints: {
              640: {
                  slidesPerView: 1.25,
                  spaceBetween: 60
              }
            },
            thumbs: {
                swiper: this.thumbs,
            },
            on: {
              slideChange: () => { this.activeSlide = this.swiper.activeIndex }
            }
        });


    },
})