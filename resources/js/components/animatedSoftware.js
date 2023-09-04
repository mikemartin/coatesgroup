
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
                    visibility: [0, 0.25],
                    type: 'stop',
                    frames: [
                        0
                    ] 
                },
                {
                    visibility: [0.25, 0.75],
                    type: 'seek',
                    frames: [
                        1, 120
                    ] 
                },
                {
                    visibility: [.75, 1],
                    type: 'stop',
                    frames: [
                        120
                    ] 
                },
                
            ],
        
        })
    }

})