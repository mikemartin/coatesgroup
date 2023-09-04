import Swiper from 'swiper';
import { Pagination, Mousewheel, A11y, FreeMode} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/mousewheel';

Swiper.use([Pagination, Mousewheel, A11y, FreeMode]);

export default () => ({
    swiper: null,
    init() {
        this.swiper = new Swiper(this.$refs.container, {
            slidesPerView: 1,
            spaceBetween: 10,
            edgeSwipeDetection: 'prevent',
            updateOnWindowResize: true,
            a11y: true,
            freeMode: true,
            cssMode: true,
            passiveListeners: true,
            mousewheel: {
              enabled: true,
              forceToAxis: true,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            breakpoints: {
              640: {
                  slidesPerView: 1.65,
                  spaceBetween: 60
              }
            }
        })
    },
})