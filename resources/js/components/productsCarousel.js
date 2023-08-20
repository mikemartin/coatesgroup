import Swiper from 'swiper';
import { Pagination, Navigation, Mousewheel, A11y, FreeMode, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/mousewheel';
import 'swiper/css/grid';

Swiper.use([Pagination, Navigation, Mousewheel, A11y, FreeMode, Grid]);

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
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            breakpoints: {
              640: {
                  slidesPerView: 3,
                  grid: {
                    fill: 'rows',
                    rows: 2,
                  },
                  spaceBetween: 24
              }
            }
        })
    },
})