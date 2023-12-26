<template>
    <div ref="accordion" class="accordion">
        <div class="accordion-item">
            <button
                @click="toggleShowBody"
                ref="header"
                :class="['accordion-header', { 'accordion-header--open': showBody }]"
            >
                <slot name="header"></slot>
            </button>
            <div
                ref="body"
                @click="updateSizeAccordion"
                v-bind:data-open="showBody ? true : null"
                :class="['accordion-body', { 'accordion-body--close': !showBody }]"
                :style="showBody ? styleOpen : styleClose"
            >
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseAccordion',
    props: {
        showBodyNow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showBody: this.showBodyNow || false,
            styleOpen: {
                height: 100 + '%',
                opacity: 1
            },
            styleClose: {
                height: 0 + 'px',
                opacity: 0
            }
        }
    },
    watch: {
        showBodyNow() {
            this.showBody = this.showBodyNow
        }
    },
    methods: {
        toggleShowBody() {
            this.showBody = !this.showBody

            if (this.showBody) {
                this.styleOpen.height = this.$refs.body.scrollHeight + 'px'
                this.styleOpen.opacity = 1
            } else {
                this.styleClose.height = 0 + 'px'
                this.styleOpen.opacity = 0
            }
        },

        updateSizeAccordion() {
            if (this.$refs.body) {
                this.styleOpen.height = 100 + '%'
                this.styleOpen.opacity = 1
                setTimeout(() => {
                    this.styleOpen.height = this.$refs.body.scrollHeight + 'px'
                })
                let timerId = setInterval(() => {
                    ;(this.styleOpen.height = this.$refs.body.scrollHeight + 'px'),
                        (this.styleOpen.height = 100 + '%')
                }, 20)
                setTimeout(() => {
                    clearInterval(timerId)
                }, 500)
                this.styleOpen.height = 100 + '%'
            }
        },

        observer() {
            let observer = new MutationObserver(() => {
                this.updateSizeAccordion()
            })

            observer.observe(this.$refs.body, {
                childList: true,
                subtree: true
            })
        }
    },
    mounted() {
        this.styleOpen.height = this.$refs.body.scrollHeight + 'px'
        this.observer()
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.accordion-body {
    overflow: hidden;
    transition: all 0.25s ease-in-out;
}

.accordion-header {
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 0.7;
    }
}
</style>
