<template>
    <div class="card">
        <div class="card__label-box">
            <p href="#" class="card__label" :class="getClass(product.status)">
                {{ product.status }}
            </p>
            <p href="#" class="card__label card__label--service">
                {{ product.service }}
            </p>
        </div>
        <a @click.prevent="showMoreDetails" href="#">
            <lazy-load-container>
                <img
                    :src="cardImage"
                    :alt="`${product.brand} ${product.model} Image`"
                    class="card__image"
                />
            </lazy-load-container>
        </a>
        <a @click.prevent="showMoreDetails" href="#" class="card__name">
            <span class="card__brand">{{ product.brand }}</span>
            <span ref="car" class="card__model">{{ modelName }}</span>
        </a>
        <p class="card__plate-number">{{ product.registration }}</p>
        <p class="card__payment">
            Аренда
            <span class="card__payment-rent">
                {{ product.payment.toLocaleString() }} ₽
                <span>/ день</span>
            </span>
        </p>
        <p class="card__price card__price-rent">
            Депозит от
            <span>{{ product.price.toLocaleString() }} ₽</span>
        </p>
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
    name: 'CardRent',
    mixins: [CardMixin],
    emits: ['moreDetails'],
    methods: {
        showMoreDetails() {
            this.$emit('moreDetails', this.product);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/сardProduct.scss';
</style>
