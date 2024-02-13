<template>
    <div class="nav-static">
        <BaseNavigation :theme="'white'" />
    </div>
    <BaseNavigation :class="[showStickyNavigation ? 'nav--attach-show' : 'nav--attach-hide']" />
    <header class="header">
        <div class="wrapper">
            <div class="header__inner">
                <div class="header__inner-wrapper">
                    <h1 class="header__title">Как кредит<span>только проще</span></h1>
                    <p class="header__text">Калькулятор</p>
                    <ul class="header-calculator__table">
                        <li class="header-calculator__table-option">Стоимость автомобиля</li>
                        <li class="header-calculator__table-value">
                            {{ currentPrice.toLocaleString() }}
                            ₽
                        </li>
                    </ul>
                    <BaseRange
                        class="header-calculator__input-price"
                        :default-value="1800000"
                        :default-step="100000"
                        :min="100000"
                        :max="9000000"
                        @current-value="currentPrice = $event"
                    />
                    <BaseCalculator
                        class="header-calculator"
                        :product-price="currentPrice || 1800000"
                        :dynamic-product-price="true"
                        :initial-down-payment="360000"
                    />
                </div>
                <div class="header__inner-wrapper">
                    <p class="header__inner-info">
                        Стоимость предмета лизинга и приведенные расчеты через калькулятор являются
                        предварительными.
                    </p>
                    <p class="header__inner-info">
                        Для точного определения процентной ставки по договору, пожалуйста,
                        обратитесь к менеджеру.
                    </p>
                </div>
            </div>
        </div>
    </header>
    <main class="main">
        <div class="main-steps">
            <div class="wrapper">
                <div class="main-steps__list">
                    <ul class="main-steps__item" v-for="(item, index) in mainSteps" :key="index">
                        <li class="main-steps__num">{{ item.num }}</li>
                        <li class="main-steps__action">
                            {{ item.action }}
                        </li>
                        <li class="main-steps__descr">{{ item.descr }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-about">
            <lazy-load-container>
                <img
                    class="main-about__bg main-about__bg--big"
                    :src="aboutBackground"
                    alt="main about background"
                />
                <img
                    class="main-about__bg main-about__bg--small"
                    :src="aboutBackgroundSmall"
                    alt="main about background"
                />
            </lazy-load-container>
            <div class="wrapper">
                <div class="main-about__inner">
                    <div class="main-about__details">
                        <h2 class="main-about__title">О компании</h2>
                        <div class="main-about__wrapper">
                            <div class="main-about__descr">
                                <template v-for="(text, index) in aboutText" :key="index">
                                    <p class="main-about__text">{{ text }}</p>
                                </template>
                            </div>
                            <div class="main-about__param">
                                <ul
                                    class="main-about__list"
                                    v-for="(item, index) in aboutList"
                                    :key="index"
                                >
                                    <li class="main-about__list-value">
                                        {{ item.value }}
                                    </li>
                                    <li class="main-about__list-descr">
                                        {{ item.descr }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <AdvantageLeasing class="main-about__features" />
                </div>
            </div>
        </div>
        <div class="main-deals">
            <div class="wrapper">
                <div class="main-deals__header">
                    <h2 class="main-deals__header-title">выгодные предложения</h2>
                    <router-link to="/catalog" class="main-deals__header-link">
                        Другие автомобили
                    </router-link>
                </div>
                <template v-if="loader">
                    <div class="main-deals__cards">
                        <template v-for="i in 4" :key="i">
                            <CardSkeleton />
                        </template>
                    </div>
                </template>
                <lazy-load-container @intersect="getLeasingCars()">
                    <div class="main-deals__cards">
                        <template v-if="loading">
                            <swiper
                                :breakpoints="{
                                    0: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 20
                                    },
                                    480: {
                                        slidesPerView: 'auto',
                                        centeredSlides: true,
                                        initialSlide: 1,
                                        spaceBetween: 20
                                    }
                                }"
                            >
                                <template v-for="i in 4" :key="i">
                                    <swiper-slide>
                                        <CardSkeleton />
                                    </swiper-slide>
                                </template>
                            </swiper>
                            <template v-for="i in 4" :key="i">
                                <CardSkeleton />
                            </template>
                        </template>
                        <template v-if="!loading">
                            <swiper
                                :breakpoints="{
                                    0: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 20,
                                        speed: 500
                                    },
                                    480: {
                                        slidesPerView: 'auto',
                                        centeredSlides: true,
                                        initialSlide: 1,
                                        spaceBetween: 20,
                                        speed: 500
                                    }
                                }"
                            >
                                <template v-for="p in productRandom.flat()" :key="p.id">
                                    <swiper-slide>
                                        <CardLeasing
                                            :product="p"
                                            @selected-model="navigateToCatalog($event)"
                                        />
                                    </swiper-slide>
                                </template>
                            </swiper>
                            <template v-for="p in productRandom.flat()" :key="p.id">
                                <CardLeasing
                                    :product="p"
                                    @selected-model="navigateToCatalog($event)"
                                />
                            </template>
                        </template>
                    </div>
                </lazy-load-container>
            </div>
            <lazy-load-container>
                <div class="main-deals__cars-logo">
                    <Vue3Marquee :pauseOnHover="true" :clone="true">
                        <img
                            v-for="(logo, index) in carsLogo"
                            :key="index"
                            :src="logo"
                            alt="logo car"
                            class="main-deals__car-img"
                        />
                    </Vue3Marquee>
                </div>
            </lazy-load-container>
        </div>
    </main>
    <BaseFooter />
</template>

<script>
import logoCherry from "@/assets/images/logo-chery.svg"
import logoKia from "@/assets/images/logo-kia.svg"
import logoGeely from "@/assets/images/logo-geely.svg"
import logoBmw from "@/assets/images/logo-bmw.svg"
import logoHyundai from "@/assets/images/logo-hyundai.svg"
import logoVw from "@/assets/images/logo-vw.svg"
import logoToyota from "@/assets/images/logo-toyota.svg"
import aboutBackground from "@/assets/images/about-background.jpg"
import aboutBackgroundSmall from "@/assets/images/about-background-small.jpg"

import BaseNavigation from "@/components/BaseNavigation.vue"
import AdvantageLeasing from "@/components/AdvantageLeasing.vue"
import BaseFooter from "@/components/BaseFooter.vue"
import BaseCalculator from "@/components/BaseCalculator.vue"
import BaseRange from "@/components/UI/Input/BaseRange.vue"
import CardLeasing from "@/components/UI/Card/CardLeasing.vue"
import CardSkeleton from "@/components/UI/Skeleton/CardSkeleton.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Vue3Marquee } from "vue3-marquee"

import helpers from "@/helpers/global"
import { fetchData } from "@/utils/apiUtils"
import { useFilterDataStore } from "@/stores/FilterDataStore"
import "swiper/css"

export default {
    components: {
        BaseNavigation,
        AdvantageLeasing,
        BaseFooter,
        BaseCalculator,
        BaseRange,
        CardLeasing,
        CardSkeleton,
        Swiper,
        SwiperSlide,
        Vue3Marquee
    },
    data() {
        return {
            filterData: useFilterDataStore(),
            mainSteps: [
                {
                    num: "01",
                    action: "Выбрать автомобиль",
                    descr: "Выберите автомобиль из нашего каталога или предложите свой вариант"
                },
                {
                    num: "02",
                    action: "Обратиться к нам",
                    descr: "Обратитесь к нам в любое удобное для вас время"
                },
                {
                    num: "03",
                    action: "заключить договор",
                    descr: "Договор заключается в течении одного дня"
                }
            ],
            aboutText: [
                "Наша компания создана в 2012 году.",
                "Основным видом деятельности является предоставление услуг по аренде и лизингу автомобилей для компаний и физический лиц.",
                "Мы ценим комфорт и время наших клиентов, поэтому стремимся оформить автомобиль для вас в максимально короткие сроки. Индивидуальный подход позволяет выбрать условия необходимые именно вам."
            ],
            aboutList: [
                { value: ">10", descr: "Лет работы" },
                { value: ">500", descr: "Автомобилей" },
                { value: ">500", descr: "Довольных клиентов" }
            ],
            currentPrice: "",
            carsLogo: [logoCherry, logoKia, logoGeely, logoBmw, logoHyundai, logoVw, logoToyota],
            aboutBackground,
            showStickyNavigation: false,
            productRandom: [],
            leasingCar: "",
            loading: false,
            aboutBackgroundSmall
        }
    },
    methods: {
        checkScrollPosition() {
            window.addEventListener("scroll", () => {
                this.showStickyNavigation = window.pageYOffset > 500
            })
        },

        async getLeasingCars() {
            this.loading = true

            const path = import.meta.env.DEV
                ? `public/data/leasing_car.json`
                : `data/leasing_car.json`

            this.leasingCar = await fetchData(
                "https://my.api.mockaroo.com/leasing_cars.json?key=a84cf050*",
                `${import.meta.env.BASE_URL}${path}`
            )

            this.getCarProduct()
            this.loading = false
        },

        getCarProduct() {
            // this.loading = true
            let product = helpers.getCarProducts(this.leasingCar)
            this.randomProduct(product)
            // this.loading = false
        },

        getRandomInt(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        },

        randomProduct(product) {
            for (let i = 0; i < 4; i++) {
                let numRandom = this.getRandomInt(1, product.length)
                this.productRandom.push(product.slice(numRandom - 1, numRandom))
            }
        },
        navigateToCatalog(e) {
            this.filterData.similarModel = e
            this.$router.push("/catalog")
        }
    },
    mounted() {
        // this.getLeasingCars()
        this.checkScrollPosition()
    }
}
</script>

<style scoped lang="scss">
.nav-static::v-deep {
    .button--arrow-right {
        &::after {
            content: url("@/assets/images/arrow-right-white.svg");
            width: 18px;
            height: 18px;
        }

        &:hover::after {
            content: url("@/assets/images/arrow-right-black.svg");
            animation: arrow-right;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        }
    }
}
.nav {
    position: fixed;
    width: 100%;
}

.nav--attach-hide {
    animation-name: hideNav;
    transition: all 0.8s ease;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}

.nav--attach-show {
    animation-name: showNav;
    transition: all 0.5s ease;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}

@keyframes showNav {
    from {
        transform: translateY(-130px);
    }
    100% {
        transform: translateY(0px);
    }
}

@keyframes hideNav {
    from {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-130px);
    }
}

.nav:not(.nav-static .nav) {
    background: $white;
    box-shadow: none;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.07);
}

.nav-static .nav {
    position: absolute;
    left: 0;
    right: 0;
    box-shadow: none;
    background: none;
}

.nav-static ::v-deep {
    .nav__callback-button {
        &:hover {
            background: $white;
        }
    }
}

.nav-static ::v-deep {
    .nav {
        &__menu-link {
            color: $white;
            &:hover {
                color: $red-dark;
            }
        }
        &__callback-button {
            color: $white;
            border: 2px solid $white;
            filter: drop-shadow(0px 0px 10px rgba(55, 73, 96, 0.25));
            &:hover {
                color: $black;
            }
        }
        .user {
            border: 2px solid $white;
            filter: drop-shadow(0px 0px 10px rgba(55, 73, 96, 0.25));
        }
    }
}

::v-deep {
    .calculator {
        & * {
            color: $white;
        }
    }
}

.header-calculator {
    margin-bottom: 156px;
    &__table {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__table-option {
        @include font(500, 16px);
    }
    &__table-value {
        @include font(500, 20px);
    }
    &__input-price {
        width: 100%;
    }
}
.header {
    margin: 0 auto;
    // width: #{'min(100%, 1920px)'};
    // height: #{'min(100vh, 1080px)'};
    height: 100vh;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.24) 92.52%),
        url("@/assets/images/header-background.jpg");
    background-repeat: no-repeat, no-repeat;
    background-position: center, right;
    background-size: cover;
    color: $white;

    &__inner {
        width: 540px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100vh;
        padding-bottom: 95px;
        & * {
            color: $white;
        }
        padding-top: 12em;
    }

    &__title {
        @include font(700, 64px, 77px);
        margin-bottom: 40px;
    }

    &__title span {
        @include font(400, 56px, 68px);
        display: block;
        color: #d9d9d9;
    }

    &__text {
        @include font(600, 18px);
        text-transform: uppercase;
        color: $gray;
        margin-bottom: 10px;
    }

    &__inner-info {
        @include font(400, 16px, 150%);
        max-width: 470px;
        color: #f2f2f5;
    }
}

.main-steps {
    padding: 260px 0 100px;
    height: auto;
    &__list {
        @include flex-between;
        flex-wrap: wrap;
        gap: 20px;
    }

    &__item {
        max-width: 410px;
        position: relative;
        &:not(:nth-child(3)) > .main-steps__action::after {
            content: "";
            background-image: url(@/assets/images/arrow-right-red.svg);
            background-repeat: no-repeat;
            background-position: right;
            display: block;
            max-width: 480px;
            height: 20px;
        }
        &:nth-child(3) > .main-steps__action::after {
            content: "";
            background-image: url(@/assets/images/arrow-right-red-long.svg);
            background-repeat: no-repeat;
            background-position: right;
            display: block;
            max-width: 660px;
            height: 20px;
        }
    }

    &__num {
        @include font(700, 220px, 264px);
        font-family: Lato, sans-serif;
        color: $gray-light;
        position: absolute;
        z-index: -1;
        left: 142px;
        bottom: 74px;
    }

    &__action {
        @include font(600, 40px, 48px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    &__descr {
        @include font(500, 16px, 140%);
        letter-spacing: 0.01em;
    }
}

.main-about {
    position: relative;
    width: #{"min(100%, 1920px)"};
    height: 100%; // ?
    margin: 0 auto;
    padding: 120px 0 144px;
    overflow: hidden;
    box-shadow: inset 0px 0px 60px rgba(0, 0, 0, 0.1);

    &__bg {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 50%;
        left: 32%;
        transform: translate(-50%, -50%);
    }

    &__bg--small {
        display: none;
    }

    &__inner {
        display: flex;
    }

    &__details {
        margin-right: 90px;
        & * {
            color: $white;
        }
    }

    &__title {
        @include font(500, 64px, 77px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin-bottom: 62px;
    }

    &__text {
        @include font(400, 20px, 140%);
        letter-spacing: 0.01em;
        max-width: 616px;
    }

    &__param {
        @include flex-between;
        width: 316px;
        flex-wrap: wrap;
        gap: 40px;
    }

    &__list-value {
        @include font(500, 50px, 61px);
        text-transform: uppercase;
    }

    &__list-descr {
        @include font(500, 16px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }

    &__descr {
        display: flex;
        flex-direction: column;
        row-gap: 35px;
        margin-bottom: 100px;
    }

    &__features {
    }
}

::v-deep {
    .features {
        position: absolute;
        left: 0%;
        right: 0%;
        transform: translate(53%, 0%);
        display: flex;
        flex-direction: column;
        row-gap: 88px;

        &__item {
            $items: ((1, 180px, 480px), (2, -10px, 600px), (3, -200px, 540px), (4, -390px, 490px));

            @each $item in $items {
                $i: nth($item, 1);
                $margin: nth($item, 2);
                $max-width: nth($item, 3);

                &:nth-child(#{$i}) {
                    margin-left: $margin;
                    max-width: $max-width;
                }
            }
        }

        &__img-box {
        }

        &__img {
            min-width: 110px;
            min-height: 110px;
        }

        &__term {
            @include font(600, 32px, 39px);
            margin-bottom: 15px;

            &::after {
                content: "";
                @include line(60px, 6px);
                display: block;
                margin-top: 15px;
            }
        }
    }
}

.main-deals {
    padding: 100px 0;
    overflow: hidden;
    .swiper {
        display: none;
        margin: 0 -15px;
        padding: 15px 15px;
    }

    &__header {
        @include flex-between;
        margin-bottom: 60px;
    }

    &__header-title {
        @include font(600, 32px, 75px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }

    &__header-link {
        @include font(600, 18px, 22px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $gray-dark;
        align-self: flex-end;
        width: 225px;
        transition: all 0.2s;

        &::after {
            content: "";
            background-image: url(@/assets/images/arrow-right-gray.svg);
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            width: 225px;
            height: 12px;
            transform: translateX(0px);
            transition: transform 0.2s ease-in-out;
        }

        &:hover::after {
            content: "";
            background-image: url(@/assets/images/arrow-right-gray.svg);
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            width: 225px;
            height: 12px;
            transform: translateX(15px);
        }
        &:hover {
            opacity: 1;
        }
    }

    &__cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    &__cars-logo {
        margin-top: 102px;
    }

    &__car-img {
        padding: 0 40px;
    }
}

@include media-query($xxl) {
    .wrapper {
        padding: 0 16px;
    }
    .main-steps {
        padding: 180px 0 100px;
        & .wrapper {
            height: 100%; // ?
        }
        &__list {
            flex-direction: column;
            gap: 200px;
            height: 100%; // ?
        }
        &__item {
            &:not(:nth-child(3)) > .main-steps__action::after {
                display: none;
            }
            &:nth-child(3) > .main-steps__action::after {
                display: none;
            }
        }
        &__item:not(:nth-child(3))::after {
            content: "";
            background-image: url(@/assets/images/rounded-line-red.svg);
            background-repeat: no-repeat;
            display: block;
            width: 32px;
            height: 68px;
            transform: scale(2);
            position: absolute;
            top: 203px;
            left: 16px;
        }
        &__num {
            left: 50vw;
        }
        &__item:nth-child(1) {
            & .main-steps__num {
                bottom: 10px;
            }
        }
        &__item:nth-child(2) {
            & .main-steps__num {
                bottom: -10px;
            }
        }
        &__item:nth-child(3) {
            & .main-steps__num {
                bottom: -10px;
            }
        }
    }

    .main-about {
        box-shadow: none;
        &__bg {
            top: 0;
            left: 0;
            transform: none;
            object-position: bottom;
            object-fit: cover;
            height: 100%;
        }
        &__bg--big {
            display: none;
        }
        &__bg--small {
            display: block;
        }
        &__inner {
            justify-content: space-between;
            gap: 40px;
        }
        &__details {
            margin-right: 0px;
        }
    }

    ::v-deep {
        .features {
            position: relative;
            transform: none;

            & * {
                color: $white;
            }

            @for $i from 1 through 4 {
                &__item:nth-child(#{$i}) {
                    margin-left: 0px;
                }
            }
        }
    }

    @media only screen and (height <= 1000px) {
        .main-steps {
            min-height: 80vh;
        }
    }

    @media only screen and (height <= 830px) {
        .main-steps {
            min-height: 100vh;
        }
    }
}

@include media-query($xl) {
    .main-about {
        padding: 100px 0;
        &__bg {
            // height: auto;
            // transform: translate(0px, -760px);
        }
        &__inner {
            flex-direction: column;
            gap: 100px;
        }
        &__details {
            display: flex;
            flex-direction: column;
        }
        &__title {
            align-self: center;
        }
        &__wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        &__text {
            width: max-content;
        }
        &__descr {
            margin-bottom: 0;
        }
    }

    .main-deals {
    }
    ::v-deep {
        .features {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 50px 30px;
            & * {
                // color: $black;
            }
            @for $i from 1 through 4 {
                &__item:nth-child(#{$i}) {
                    max-width: none;
                    flex: 0 1 calc(50% - 15px);
                }
            }
        }
    }
}

@include media-query($lg) {
    .header {
        background-position: center, left;
    }

    .main-about {
        &__descr {
            flex: 0 1 60%;
        }
        &__param {
            flex: 0 1 30%;
        }
        &__text {
            width: auto;
        }
    }

    .main-deals {
        &__header-link {
            align-self: center;
            &:hover::after {
                transform: translateX(0);
                background-position: right;
                width: 150px;
            }
        }
    }

    ::v-deep {
        .features {
            gap: 25px 10px;
            &__img-box {
                transform: scale(0.8);
                margin-right: 20px;
            }
            &__term {
                font-size: 30px;
            }
            &__definition {
                font-size: 14px;
            }
            @for $i from 1 through 4 {
                &__item:nth-child(#{$i}) {
                    flex: 0 1 calc(50% - 5px);
                }
            }
            &__img-box {
                margin-right: 10px;
            }
        }
    }
}

@include media-query($md) {
    .main-steps {
        &__num {
            font-size: 180px;
        }
        &__item:nth-child(1) {
            & .main-steps__num {
                bottom: 0px;
            }
        }
        &__item:nth-child(2) {
            & .main-steps__num {
                bottom: -25px;
            }
        }
        &__item:nth-child(3) {
            & .main-steps__num {
                bottom: -25px;
            }
        }
    }

    .main-about {
        padding: 100px 0;
        box-shadow: 0px 0px 29.501px 0px rgba(0, 0, 0, 0.1) inset;
        &__title {
            margin-bottom: 32px;
        }
        &__wrapper {
            flex-direction: column;
        }
        &__descr {
            margin-bottom: 40px;
            row-gap: 10px;
        }
        &__param {
            flex-direction: column-reverse;
            flex: 0 1 100%;
            width: 100%;
            gap: 24px;
        }
        &__list {
            display: flex;
            align-items: baseline;
            column-gap: 8px;
        }
        &__text {
            max-width: none;
        }
        &__bg {
            height: 52%;
        }
        &__inner {
            gap: 0;
        }
        &__details {
            margin-bottom: 100px;
        }
    }

    ::v-deep {
        .features {
            flex-direction: column;
            gap: 44px;
            & * {
                color: $black;
            }
        }
    }

    .main-deals {
        .swiper {
            display: block;
        }
        &__cards {
            max-width: 100%;
            & > .card {
                display: none;
            }
        }
        &__header {
            flex-direction: column;
        }
        &__header-link {
            align-self: flex-start;
        }
    }
}

@include media-query($sm) {
    .header {
        background-position: center, left;
        &__inner {
            width: auto;
            padding-top: 150px;
        }
        &__title {
            @include font(700, 48px, 61px);
            margin-bottom: 30px;
            & span {
                @include font(400, 40px);
            }
        }
        &__text {
            margin-bottom: 5px;
        }
    }

    .header-calculator {
        margin-bottom: 50px;
    }

    .main-steps {
        &__action {
            width: min-content;
            font-size: 30px;
            line-height: normal;
        }
        &__item:not(:nth-child(3))::after {
            top: 176px;
        }
    }

    .main-about {
        padding: 40px 0;
        &__title {
            align-self: flex-start;
            @include font(600, 32px);
        }
        &__text {
            @include font(500, 12px);
        }
        &__list-value {
            @include font(500, 28px);
        }
        &__list-descr {
            @include font(600, 12px);
        }
        &__bg {
            height: 50%;
        }
    }

    .main-deals {
        padding: 60px 0 80px;
        &__header {
            margin-bottom: 32px;
        }
        &__header-title {
            font-size: 28px;
            line-height: 50px;
        }
        &__cars-logo {
            margin-top: 60px;
        }
        &__car-img {
            padding: 0 10px;
            transform: scale(0.7);
        }
    }

    ::v-deep {
        .features {
            &__img-box {
            }
            &__img {
                min-width: 54px;
                min-height: 54px;
                transform: scale(0.6);
                max-width: none;
            }
            &__term {
                @include font(600, 20px);
                margin-bottom: 10px;
                &::after {
                    content: "";
                    @include line(40px, 4px);
                    display: block;
                    margin-top: 10px;
                }
            }
            &__definition {
                @include font(500, 12px);
            }
        }
    }
}

@include media-query($xs) {
    .header {
        &__inner {
            padding-top: 123px;
        }
        &__title {
            font-size: 40px;
            line-height: 41px;
            & span {
                font-size: 35px;
            }
        }
        &__text {
            @include font(400, 16px);
        }
        &__inner-info {
            @include font(400, 12px, 18px);
        }
    }

    .header-calculator {
        &__table-option {
            @include font(400, 12px);
        }
        &__table-value {
            @include font(300, 16px);
        }
    }

    .main-steps {
        padding: 100px 0 60px;
        &__action {
            font-size: 20px;
        }
        &__num {
            font-size: 100px;
            line-height: normal;
        }
        &__descr {
            font-size: 12px;
        }
        &__item:not(:nth-child(3))::after {
            content: "";
            transform: scale(1.5);
            top: 150px;
            left: 8px;
        }
        &__item:nth-child(1) {
            & .main-steps__num {
                bottom: 35px;
            }
            & .main-steps__descr {
                width: 282px;
            }
        }
        &__item:nth-child(2) {
            & .main-steps__num {
                bottom: 15px;
            }

            & .main-steps__descr {
                width: 216px;
            }
        }
        &__item:nth-child(3) {
            & .main-steps__num {
                bottom: 15px;
            }
            & .main-steps__descr {
                width: 196px;
            }
        }
    }

    .main-deals {
        &__header-title {
            font-size: 22px;
            line-height: 40px;
        }
        &__header-link {
            display: flex;
            gap: 20px;
            align-items: center;
            width: auto;
            font-size: 16px;
            &::after {
                flex: 0 0 auto;
                width: 150px;
                background-position: right;
            }
        }
    }
}

@include media-query($xxs) {
    .main-about {
        &__bg {
            height: 48%;
        }
    }
    .main-deals {
        &__header-title {
            font-size: 20px;
            line-height: 30px;
        }
    }
}

::v-deep {
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        & .card {
            height: 100%;
        }
    }
}
</style>
