
import Plyr from 'plyr';

export default () => ({
    player: null,
    ready: false, 
    autoplay: false,
    loadPlayer() {
        this.player = new Plyr(this.$refs.player, {
            ratio: '9:5',
            hideControls: false,
            keyboard: {
                global: true,
            },
            tooltips: {
                controls: true,
            },
            captions: {
                active: true,
            },
        });

        this.player.toggleControls(false);

        this.player.on('play', event => {
            this.player.toggleControls(true);
        });

        this.player.on('ready', event => {
            this.ready = true;
            if (this.autoplay) {
                this.player.play();
            }
        });
    }
})