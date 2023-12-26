<template>
    <transition name="fade">
        <div
            class="toast"
            v-if="showToast"
        >
            <div class="toast__content">
                <slot name="content"></slot>
            </div>
            <div
                class="toast__close"
                @click="showToast = false"
            >
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
};
</script>

<style lang="scss">
@import '@/assets/styles/theme.scss';
</style>
