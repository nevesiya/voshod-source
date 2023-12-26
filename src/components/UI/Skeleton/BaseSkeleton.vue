<template>
    <div class="skeleton" :style="{ width: width, height: height }"></div>
</template>

<script>
export default {
    name: 'BaseSkeleton',
    props: {
        width: {
            type: String
            // default: '100%' // Ширина по умолчанию
        },
        height: {
            type: String
            // default: '100%' // Высота по умолчанию
        }
    }
}
</script>

<style lang="scss" scoped>
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 140% 0;
    }
    100% {
        background-position: -40% 0;
    }
}
</style>
