import Macy from 'macy';

export default () => ({
    init() {
        // Masonry Support
        // https://techhub.iodigital.com/articles/why-you-should-be-using-new-css-features-today/why-you-should-be-using-new-css-features-today-part-2
        const supportMasonry = CSS.supports('grid-template-rows', 'masonry');

        if (!supportMasonry) {
            document.querySelectorAll('.grid[data-columns]').forEach((elem) => {
                const macy = new Macy({
                    container: elem,
                    columns: 1,
                    mobileFirst: true,
                    margin: 24,
                    breakAt: {
                        '768': elem.dataset.columns,
                    }
                });
        
                macy.runOnImageLoad(function () {
                    macy.recalculate(true, true);
                }, true);
            });    
        };
    },
})
