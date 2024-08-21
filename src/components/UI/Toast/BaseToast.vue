<template>
    <transition name="fade">
        <div class="toast" v-if="showToast">
            <div class="toast__content">
                <slot name="content"></slot>
            </div>
            <div class="toast__close" @click="closeToast">
                <slot name="close"></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BaseToast',
    data() {
        return {
            showToast: true,
        };
    },
    methods: {
        closeToast() {
            sessionStorage.setItem('showToastFromCatalog', false);
            this.showToast = false;
        },
    },
    beforeMount() {
        if (sessionStorage.getItem('showToastFromCatalog') === 'false') {
            this.showToast = false;
        }
    },
};
</script>

<style lang="scss"></style>
