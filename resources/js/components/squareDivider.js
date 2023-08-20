import Vivus from 'vivus';
import { gsap } from 'gsap';

export default () => ({
    vivus: null,
    init() {
        this.vivus = new Vivus(this.$refs.square, {
            duration: 100,
            start: 'manual',
            animTimingFunction: Vivus.EASE
        });
    
        const resizeObserver = new ResizeObserver((entries) => {
            this.vivus.recalc();
        });
    
        resizeObserver.observe(this.vivus.el);
        
        gsap.set(this.$el.children, {
            autoAlpha: 0, 
            y: 24
        });
    },

    drawSquare(target) {
        gsap.to(target, {
            autoAlpha: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.12
        });
        this.vivus.play();
    }

})