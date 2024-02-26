<template>
    <div class="modal-bg modal-bg--theme-white">
        <div class="wrapper">
            <div id="loading"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheLoader',
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 999;
}

#loading {
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 3px solid $red-dark;
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
