
import lottie from 'lottie-web'
import { create } from '@lottiefiles/lottie-interactivity';

export default (path, frames, reversed = false) => ({
    animation: '',
    init() {
        this.animation = lottie.loadAnimation({
            container: this.$el,
            renderer: 'svg',
            autoplay: false,
            loop: true,
            path: path
        }),
        create({
            mode: 'scroll',
            player: this.animation,
            container: '.product-features',
            actions: [
                {
                    visibility: [0, .2],
                    type: 'stop',
                    frames: [
                        reversed ? frames : 0
                    ] 
                },
                {
                    visibility: [0.2, 0.45],
                    type: 'seek',
                    frames: [
                        reversed ? frames : 0,
                        reversed ? 0 : frames
                    ]
                },
                {
                    visibility: [0.45, 1.0],
                    type: 'seek',
                    frames: [
                        reversed ? 0 : frames,
                        reversed ? frames : 0
                    ]
                },
            ],
        
        })
    }

})