export default {
    data() {
        return {
            scrollPosition: 0,
        };
    },
    methods: {
        disabledScroll() {
            this.scrollPosition = window.scrollY;
            document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${this.scrollPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${
                window.innerWidth - document.documentElement.clientWidth
            }px
    `;
            document.documentElement.style.scrollBehavior = 'unset';
        },

        enabledScroll() {
            document.body.style.cssText = '';
            window.scroll({ top: this.scrollPosition });
            document.documentElement.style.scrollBehavior = '';
        },
    },

    mounted() {
        this.disabledScroll();
    },

    unmounted() {
        this.enabledScroll();
    },
};
