
import lottie from 'lottie-web'
import { create } from '@lottiefiles/lottie-interactivity';

export default (path, frames, container, reversed = false) => ({
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
            container: container,
            actions: [
                {
                    visibility: [0, .2],
                    type: 'stop',
                    frames: [
                        reversed ? frames : 0
                    ] 
                },
                {
                    visibility: [0.2, 1.0],
                    type: 'seek',
                    frames: [
                        reversed ? frames : 0,
                        reversed ? 0 : frames
                    ]
                },
            ],
        
        })
    }

})