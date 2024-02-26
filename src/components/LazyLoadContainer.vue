<template>
    <div class="lazy-load" ref="intersectionTarget">
        <template v-if="showContent">
            <slot></slot>
        </template>
        <template v-else>
            <slot name="placeholder"></slot>
        </template>
    </div>
</template>

<script>
import { useSavedScrollPosition } from '@/stores/ScrollPositionStore';

export default {
    name: 'LazyLoadContainer',
    props: {
        root: {
            default: null,
        },
        rootMargin: {
            type: String,
            default: '200px 0px',
        },
        threshold: {
            type: Array,
            default: () => {
                return [0];
            },
        },
    },
    data() {
        return {
            observer: null,
            showContent: false,
            savedPositionStore: useSavedScrollPosition(),
        };
    },
    emits: ['intersect'],
    methods: {
        handleIntersection(entries) {
            const lowerBorderEl = entries[0].boundingClientRect.bottom;
            const savedPositionStore = useSavedScrollPosition();
            const isAbove =
                savedPositionStore.currentScrollPosition > lowerBorderEl;

            entries.forEach((entry) => {
                if (entry.isIntersecting || isAbove) {
                    this.showContent = true;
                    this.$emit('intersect');
                    this.observer.disconnect();
                }
            });
        },
    },
    mounted() {
        const options = {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection,
            options,
        );

        this.observer.observe(this.$refs.intersectionTarget);
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
};
</script>

<style scoped lang="scss"></style>
