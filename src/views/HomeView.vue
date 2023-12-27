<template>
    <div class="nav-static">
        <BaseNavigation :theme="'white'" />
    </div>
    <BaseNavigation :class="[showStickyNavigation ? 'nav--attach-show' : 'nav--attach-hide']" />
    <header class="header">
        <div class="wrapper">
            <div class="header__inner">
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
                <p class="header__inner-info">
                    Стоимость предмета лизинга и приведенные расчеты через калькулятор являются
                    предварительными.
                </p>
                <p class="header__inner-info">
                    Для точного определения процентной ставки по договору, пожалуйста, обратитесь к
                    менеджеру.
                </p>
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
                <img class="main-about__bg" :src="aboutBackground" alt="main about background" />
            </lazy-load-container>
            <div class="wrapper">
                <div class="main-about__inner">
                    <div class="main-about__details">
                        <h2 class="main-about__title">О компании</h2>

                        <template v-for="(text, index) in aboutText" :key="index">
                            <p class="main-about__text">{{ text }}</p>
                        </template>
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
                <lazy-load-container :root-margin="'0px 0px'" @intersect="getLeasingCars()">
                    <div class="main-deals__cards">
                        <TransitionGroup name="collapse">
                            <template v-if="loading">
                                <template v-for="i in 4" :key="i">
                                    <CardSkeleton />
                                </template>
                            </template>
                        </TransitionGroup>
                        <TransitionGroup name="collapse">
                            <template v-if="!loading">
                                <template v-for="p in productRandom.flat()" :key="p.id">
                                    <CardLeasing
                                        :product="p"
                                        @selected-model="navigateToCatalog($event)"
                                    />
                                </template>
                            </template>
                        </TransitionGroup>
                    </div>
                    <template #placeholder>
                        <div class="main-deals__cards">
                            <template v-for="i in 4" :key="i">
                                <CardSkeleton />
                            </template>
                        </div>
                    </template>
                </lazy-load-container>
                <div class="main-deals__cars-logo">
                    <img
                        v-for="(logo, index) in carsLogo"
                        :key="index"
                        v-lazy-img="logo"
                        alt="logo car"
                        class="main-deals__car-img"
                    />
                </div>
            </div>
        </div>
    </main>
    <BaseFooter />
</template>

<script>
import logoCherry from '@/assets/images/logo-chery.svg'
import logoKia from '@/assets/images/logo-kia.svg'
import logoGeely from '@/assets/images/logo-geely.svg'
import logoBmw from '@/assets/images/logo-bmw.svg'
import logoHyundai from '@/assets/images/logo-hyundai.svg'
import logoVw from '@/assets/images/logo-vw.svg'
import logoToyota from '@/assets/images/logo-toyota.svg'
import aboutBackground from '@/assets/images/about-background.jpg'

import BaseNavigation from '@/components/BaseNavigation.vue'
import AdvantageLeasing from '@/components/AdvantageLeasing.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import BaseCalculator from '@/components/BaseCalculator.vue'
import BaseRange from '@/components/UI/Input/BaseRange.vue'
import CardLeasing from '@/components/UI/Card/CardLeasing.vue'
import CardSkeleton from '@/components/UI/Skeleton/CardSkeleton.vue'

import helpers from '@/helpers/global'
import { fetchData } from '@/utils/apiUtils'
import { useFilterDataStore } from '@/stores/FilterDataStore'

export default {
    components: {
        BaseNavigation,
        AdvantageLeasing,
        BaseFooter,
        BaseCalculator,
        BaseRange,
        CardLeasing,
        CardSkeleton
    },
    data() {
        return {
            filterData: useFilterDataStore(),
            mainSteps: [
                {
                    num: '01',
                    action: 'Выбрать автомобиль',
                    descr: 'Выберите автомобиль из нашего каталога или предложите свой вариант'
                },
                {
                    num: '02',
                    action: 'Обратиться к нам',
                    descr: 'Обратитесь к нам в любое удобное для вас время'
                },
                {
                    num: '03',
                    action: 'заключить договор',
                    descr: 'Договор заключается в течении одного дня'
                }
            ],
            aboutText: [
                'Наша компания создана в 2012 году.',
                'Основным видом деятельности является предоставление услуг по аренде и лизингу автомобилей для компаний и физический лиц.',
                'Мы ценим комфорт и время наших клиентов, поэтому стремимся оформить автомобиль для вас в максимально короткие сроки. Индивидуальный подход позволяет выбрать условия необходимые именно вам.'
            ],
            aboutList: [
                { value: '>10', descr: 'Лет работы' },
                { value: '>500', descr: 'Автомобилей' },
                { value: '>500', descr: 'Довольных клиентов' }
            ],
            currentPrice: '',
            carsLogo: [logoCherry, logoKia, logoGeely, logoBmw, logoHyundai, logoVw, logoToyota],
            aboutBackground,
            showStickyNavigation: false,
            productRandom: [],
            leasingCar: '',
            loading: false
        }
    },
    methods: {
        checkScrollPosition() {
            window.addEventListener('scroll', () => {
                this.showStickyNavigation = window.pageYOffset > 500
            })
        },

        async getLeasingCars() {
            this.loading = true

            const path = import.meta.env.DEV
                ? `public/data/leasing_car.json`
                : `data/leasing_car.json`

            this.leasingCar = await fetchData(
                'https://my.api.mockaroo.com/leasing_cars.json?key=a84cf050*',
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
            this.$router.push('/catalog')
        }
    },
    mounted() {
        // this.getLeasingCars()
        this.checkScrollPosition()
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.nav-static::v-deep {
    .button--arrow-right {
        &::after {
            content: url('@/assets/images/arrow-right-white.svg');
            width: 18px;
            height: 18px;
        }

        &:hover::after {
            content: url('@/assets/images/arrow-right-black.svg');
            animation: arrow-right;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        }
    }
}

// TheNav

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
        transform: translateY(-100px);
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
        transform: translateY(-100px);
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

// calculator
::v-deep {
    .calculator {
        & * {
            color: $white;
        }
    }
}

// this
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
    height: #{'min(100vh, 1080px)'};
    width: #{'min(100%, 1920px)'};
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.24) 92.52%),
        url('@/assets/images/header-background.jpg');
    background-repeat: no-repeat, no-repeat;
    background-position: center, center;
    color: $white;

    &__inner {
        width: 540px;
        & * {
            color: $white;
        }
        padding-top: 180px;
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
    &__list {
        @include flex-between;
        flex-wrap: wrap;
    }

    &__item {
        max-width: 410px;
        position: relative;
        &:not(:nth-child(3)) > .main-steps__action::after {
            content: '';
            background-image: url(@/assets/images/arrow-right-red.svg);
            background-repeat: no-repeat;
            display: block;
            width: 480px;
            height: 20px;
        }
        &:nth-child(3) > .main-steps__action::after {
            content: '';
            background-image: url(@/assets/images/arrow-right-red-long.svg);
            background-repeat: no-repeat;
            display: block;
            width: 660px;
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
    width: #{'min(100%, 1920px)'};
    margin: 0 auto;
    padding-top: 120px;
    overflow: hidden;
    box-shadow: inset 0px 0px 60px rgba(0, 0, 0, 0.1);

    &__bg {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        height: 100%; /* или явно указать высоту */
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
        margin-bottom: 35px;
        width: 616px;

        &:nth-last-child(2) {
            margin-bottom: 100px;
        }
    }

    &__param {
        @include flex-between;
        width: 316px;
        flex-wrap: wrap;
        gap: 40px;
    }

    &__list-value {
        @include font(500, 50px, 61px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }

    &__list-descr {
        @include font(500, 16px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }

    &__features {
        color: $black;
    }
}

::v-deep {
    .features {
        &__item {
            margin-bottom: 88px;

            &:nth-child(1) {
                margin-left: 180px;
                width: 480px;
            }

            &:nth-child(2) {
                margin-left: -10px;
                width: 600px;
            }

            &:nth-child(3) {
                margin-left: -200px;
                width: 540px;
            }

            &:nth-child(4) {
                margin-left: -390px;
                width: 490px;
            }
        }
        &__img-box {
            max-width: 110px;
            max-height: 110px;
        }

        &__img {
            min-width: 110px;
            min-height: 110px;
            margin-right: 40px;
        }

        &__term {
            @include font(600, 32px, 39px);
            margin-bottom: 15px;

            &::after {
                content: '';
                @include line(60px, 6px);
                display: block;
                margin-top: 15px;
            }
        }
    }
}

.main-deals {
    padding: 100px 0;

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
            content: '';
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
            content: '';
            background-image: url(@/assets/images/arrow-right-gray.svg);
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            width: 225px;
            height: 12px;
            transform: translateX(20px);
        }
        &:hover {
            opacity: 1;
        }
    }

    &__cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    &__cars-logo {
        @include flex-between;
        margin-top: 102px;
    }
}
</style>
