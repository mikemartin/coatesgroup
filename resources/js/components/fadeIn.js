export default () => ({
    fadeIn(target) {
        gsap.to(target, {
            autoAlpha: 1, 
            y: 0, 
            duration: 0.5
        });
    },
    fadeOut(target) {
        gsap.to(target, {
            autoAlpha: 0, 
            y: 0, 
            duration: 0.5
        });
    },
    hide(target) {
        gsap.set(target, {
            autoAlpha: 0, 
            y: 24
        });
    },
    fadeInStagger(target, faster = false) {
        gsap.to(target.children, {
            autoAlpha: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: faster ? 0.12 : 0.2
        });
    },

})
