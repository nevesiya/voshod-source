<template>
    <div class="card">
        <div class="card__label-box">
            <template v-for="item in product.promo" :key="item">
                <p href="#" class="card__label" :class="getClass(item)">
                    {{ item }}
                </p>
            </template>
        </div>
        <router-link :to="`/catalog/${this.product.id}`">
            <lazy-load-container>
                <img
                    :src="cardImage"
                    :alt="`${product.brand} ${product.model} Image`"
                    class="card__image"
                />
            </lazy-load-container>
        </router-link>
        <router-link class="card__name" :to="`/catalog/${this.product.id}`">
            <span class="card__brand">{{ product.brand }}</span>
            <span ref="car" class="card__model">{{ modelName }}</span>
        </router-link>
        <p class="card__payment">
            Минимальный платёж
            <span class="card__payment-leasing">
                {{ product.payment.toLocaleString() }} ₽
            </span>
        </p>
        <p class="card__price">
            Цена от
            <span>{{ product.price.toLocaleString() }} ₽</span>
        </p>
        <a
            class="card__more"
            href="#"
            @click.prevent="selectSimilarModels(product.model)"
        >
            Посмотреть похожие модели
        </a>
        <button
            @click="showModal = true"
            class="card__book button--size-m button button--color-red"
        >
            Забронировать
        </button>
        <transition name="fade">
            <ModalBooking
                v-if="showModal"
                :name-car="`${product.brand} ${modelName}`"
                @close-modal="showModal = false"
            />
        </transition>
    </div>
</template>

<script>
import CardMixin from '@/mixins/CardMixin';

export default {
    name: 'CardLeasing',
    mixins: [CardMixin],
    emits: ['selectedModel', 'moreDetails'],
    methods: {
        selectSimilarModels(model) {
            this.$emit('selectedModel', model);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/сardProduct.scss';
</style>
