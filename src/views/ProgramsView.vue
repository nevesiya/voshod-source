<template>
    <main class="main-leasing">
        <div class="main-leasing__explanation">
            <div class="wrapper">
                <h1 class="main-leasing__explanation-title title-primary">Лизинг</h1>
                <div class="main-leasing__explanation-box">
                    <p class="main-leasing__explanation-text">
                        Автолизинг – это финансовая услуга, с помощью которой Вы пользуетесь
                        автомобилем уже сегодня и при закрытии договора получаете его в
                        собственность.
                    </p>
                    <p class="main-leasing__explanation-text">
                        В конце срока лизинга гибкие решения позволяют вам определить, что делать с
                        автомобилем:
                    </p>
                </div>
                <div class="main-leasing__action">
                    <p class="main-leasing__action-text">Продлить договор</p>
                    <p class="main-leasing__action-text">Вернуть автомобиль (и взять новый)</p>
                    <p class="main-leasing__action-text">
                        Выкупить автомобиль (в том числе на третье лицо)
                    </p>
                </div>
            </div>
        </div>
        <div class="main-leasing__advantage">
            <div class="wrapper">
                <h5 class="main-leasing__advantage-title title-secondary">
                    Преимущества лизинга для физических лиц:
                </h5>
                <AdvantageLeasing class="main-leasing__advantage-list" />
            </div>
        </div>
        <div class="main-leasing__arrange">
            <div class="wrapper">
                <h2 class="main-leasing__arrange-title title-primary">Как оформить лизинг?</h2>
                <div class="main-leasing__arrange-requirements arrange-requirements">
                    <h6 class="main-leasing__arrange-title title-secondary">Общие требования:</h6>
                    <p class="main-leasing__arrange-list">
                        <span
                            v-for="requirement in arrangeRequirements"
                            :key="requirement.id"
                            class="main-leasing__arrange-item"
                        >
                            {{ requirement }}
                        </span>
                    </p>
                </div>
                <div class="main-leasing__arrange-documents arrange-documents">
                    <h6 class="main-leasing__arrange-title title-secondary">
                        Список документов, необходимых для заключения договора:
                    </h6>
                    <p class="main-leasing__arrange-list">
                        <span
                            v-for="document in arrangeDocuments"
                            :key="document.id"
                            class="main-leasing__arrange-item"
                        >
                            {{ document }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="main-leasing__farther">
            <div class="wrapper">
                <h6 class="main-leasing__farther-title title-primary">Я подхожу, что дальше?</h6>
                <div class="main-leasing__farther-steps farther-steps">
                    <ul class="farther-steps__list">
                        <li class="farther-steps__num">01</li>
                        <li class="farther-steps__action">Выбираете программу лизинга</li>
                    </ul>
                    <ul class="farther-steps__list">
                        <li class="farther-steps__num">02</li>
                        <li class="farther-steps__action">Выбираете автомобиль</li>
                        <li class="farther-steps__btn">
                            <button
                                class="button button--arrow-right button--color-red button--size-s"
                                @click="this.$router.push('/catalog')"
                            >
                                Пререйти в каталог
                            </button>
                        </li>
                    </ul>
                    <ul class="farther-steps__list">
                        <li class="farther-steps__num">03</li>
                        <li class="farther-steps__action">Заключаете договор</li>
                        <li class="farther-steps__btn">
                            <button
                                class="button button--arrow-right button--color-red button--size-s"
                                @click="showModalCallback = true"
                            >
                                Заказать звонок
                            </button>
                        </li>
                        <transition name="fade">
                            <ModalCallback
                                v-if="showModalCallback"
                                :show-modal="showModalCallback"
                                @close-modal="showModalCallback = false"
                        /></transition>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-leasing__version">
            <div class="wrapper">
                <div class="main-leasing__version-content">
                    <div class="main-leasing__version-box">
                        <h6 class="main-leasing__version-title">Новые</h6>
                        <p class="main-leasing__version-text">
                            После заключения договора вы получаете выбранный автомобиль в
                            долгосрочное пользование с правом выкупа.
                        </p>
                        <ul class="main-leasing__version-description version-description">
                            <li class="version-description__term">Предмет лизинга:</li>
                            <li class="version-description__definition">Новые автомобили</li>
                        </ul>
                        <div class="main-leasing__version-condition version-condition">
                            <h6 class="version-condition__title">Условия:</h6>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Первоначальный взнос</dt>
                                <dd class="version-condition__definition">
                                    от 10 до 30% от стоимости а/м
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Срок</dt>
                                <dd class="version-condition__definition">от 1 до 5 лет</dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Условия выкупа</dt>
                                <dd class="version-condition__definition">1000 ₽</dd>
                            </dl>
                        </div>
                    </div>
                    <div class="main-leasing__version-box">
                        <h6 class="main-leasing__version-title">с пробегом</h6>
                        <p class="main-leasing__version-text">
                            После завершения срока договора право собственности на автомобиль
                            переходит к вам
                        </p>
                        <ul class="main-leasing__version-description version-description">
                            <li class="version-description__term">Предмет лизинга:</li>
                            <li class="version-description__definition">Автомобили с пробегом</li>
                        </ul>
                        <div class="main-leasing__version-info version-info">
                            <dl class="version-info__list">
                                <dt class="version-info__term">Возраст</dt>
                                <dd class="version-info__definition">
                                    не более 5 лет (с даты выпуска ПТС)
                                </dd>
                            </dl>
                            <dl class="version-info__list">
                                <dt class="version-info__term">Пробег</dt>
                                <dd class="version-info__definition">не более 140 тыс. км.</dd>
                            </dl>
                            <dl class="version-info__list">
                                <dt class="version-info__term">Тех. состояние</dt>
                                <dd class="version-info__definition">
                                    а/м технически исправен, комплектен, повреждений нет наличие 2х
                                    ключей
                                </dd>
                            </dl>
                        </div>
                        <div class="main-leasing__version-condition version-condition">
                            <h6 class="version-condition__title">Условия:</h6>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Первоначальный взнос</dt>
                                <dd class="version-condition__definition">
                                    от 10 до 30% от стоимости а/м
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Срок</dt>
                                <dd class="version-condition__definition">от 1 до 5 лет</dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Условия выкупа</dt>
                                <dd class="version-condition__definition">1000 ₽</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-leasing__question">
            <div class="wrapper">
                <h2 class="main-leasing__question-title title-primary">Вопросы</h2>
                <lazy-load-container @intersect="getFaqLaasing()">
                    <div class="main-leasing__question-wrapper question-leasing">
                        <div class="question-leasing__accordion">
                            <BaseQuestion
                                :questions="questionsLeasing"
                                :start-slice="0"
                                :end-slice="5"
                            />
                        </div>
                        <div class="question-leasing__accordion">
                            <BaseQuestion :questions="questionsLeasing" :start-slice="5" />
                        </div>
                    </div>
                </lazy-load-container>
                <div class="main-leasing__question-contact question-contact">
                    <h6 class="question-contact__title">Не нашли ответ на свой вопрос?</h6>
                    <p class="question-contact__tel">
                        Позвоните нам по телефону:
                        <a href="tel:+7 (812) 317-68-15">8 800 123 45 67</a>
                    </p>
                    <p class="question-contact__open-hour">
                        Время работы: с 9.00 до 21.00 (выходной – пн.)
                    </p>
                    <p class="question-contact__info">Звонок бесплатный</p>
                </div>
            </div>
        </div>
    </main>
    <BaseFooter />
</template>

<script>
import AdvantageLeasing from '@/components/AdvantageLeasing.vue'
import ModalCallback from '@/components/UI/Modal/ModalCallback.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import BaseQuestion from '@/components/BaseQuestion.vue'

import { fetchData } from '@/utils/apiUtils'

export default {
    components: {
        AdvantageLeasing,
        BaseFooter,
        BaseQuestion,
        ModalCallback
    },
    data() {
        return {
            showModalCallback: false,
            arrangeRequirements: [
                'Гражданство РФ',
                'Возраст не менее 21 лет',
                'Водительский стаж от 3-х лет',
                'Постоянная или временная регистрация сроком не менее 6 месяцев на территории РФ'
            ],
            arrangeDocuments: [
                'Паспорт РФ',
                'Водительское удостоверение (или другой документ, удостоверяющий личность)'
            ],
            questionsLeasing: ''
        }
    },
    methods: {
        async getFaqLaasing() {
            const path = import.meta.env.DEV
                ? `public/data/leasing_faq.json`
                : `data/leasing_faq.json`

            this.questionsLeasing = await fetchData(`${import.meta.env.BASE_URL}${path}`)
        }
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';
.main-leasing {
    // padding: 80px 0 100px;
    &__action {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-left: 36px;
    }
    &__action-text {
        @include font(400, 15px, 140%);
        letter-spacing: 0.15px;
        display: flex;
        align-items: center;
        border-radius: 2px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
        padding-right: 20px;
        width: max-content;

        &::before {
            content: '';
            background: url(@/assets/images/document-check.svg), $black;
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 50px;
            display: inline-block;
            padding: 10px;
            border-radius: 2px;
            box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
            margin-right: 20px;
        }
    }
    &__advantage {
        margin-bottom: 114px;
    }
    &__advantage-list {
        display: flex;
        flex-wrap: wrap;
        row-gap: 40px;
        column-gap: 82px;
    }
    &__advantage-title {
        margin-bottom: 42px;
    }
    &__arrange {
        padding: 120px 0 100px;
        background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
        box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1) inset;
    }
    &__arrange-title {
        margin-bottom: 40px;
    }
    &__arrange-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    &__arrange-item {
        display: flex;

        &::before {
            content: '';
            background: url(@/assets/images/check-circle.svg);
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-right: 10px;
        }
    }
    &__arrange-documents {
    }
    &__arrange-requirements {
    }
    &__explanation {
        position: relative;
        margin: 80px 0 114px;
        &::before {
            content: '';
            display: block;
            position: absolute;
            @include line(6px, 100%, $red-dark);
            left: 252px;
        }
    }
    &__explanation-box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 40px;
        max-width: 776px;
        margin-left: 36px;
    }
    &__explanation-text {
        @include font(500, 16px, 140%);
        letter-spacing: 0.016px;
    }
    &__explanation-title {
        margin-bottom: 30px;
        margin-left: 36px;
    }
    &__farther {
        padding: 100px 0px 110px;
    }
    &__farther-steps {
        position: relative;
        &::before {
            content: '';
            background-image: url(@/assets/images/rounded-line.svg);
            background-repeat: no-repeat;
            background-position: left;
            position: absolute;
            height: 203px;
            width: 113px;
            margin-left: -50px;
            margin-top: 80px;
        }
    }
    &__farther-title {
        margin-bottom: 239px;
    }
    &__question {
        padding: 120px 0 100px;
    }
    &__question-title {
        margin-bottom: 60px;
    }
    &__question-accordion {
    }
    &__question-contact {
    }
    &__question-wrapper {
    }

    &__version {
        & dt {
            max-width: 237px;
            overflow: hidden;
            white-space: nowrap;
        }
        & dt::after {
            content: ' .....................................................................................';
        }
    }
    &__version-content {
        @include flex-between;
    }
    &__version-box {
    }
    &__version-condition {
    }
    &__version-description {
        margin-bottom: 20px;
    }
    &__version-info {
    }
    &__version-text {
        @include font(500, 20px, 140%);
        letter-spacing: 0.2px;
        margin-bottom: 30px;
    }
    &__version-title {
        @include font(600, 72px, 140%);
        letter-spacing: 0.72px;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
}

.question-contact {
    position: relative;
    &::before {
        content: '';
        display: block;
        position: absolute;
        @include line(6px, 100%, #bf3535);
    }
    & * {
        @include font(500, 16px, 140%);
        letter-spacing: 0.32px;
    }
    &__info {
        color: $red-dark;
        margin-left: 30px;
    }
    &__open-hour {
        margin-bottom: 10px;
        margin-left: 30px;
    }
    &__tel {
        margin-bottom: 10px;
        margin-left: 30px;
    }
    &__title {
        @include font(600, 24px, 140%);
        letter-spacing: 0.48px;
        text-transform: uppercase;
        margin-bottom: 20px;
        margin-left: 30px;
    }
}

.question-leasing {
    display: flex;
    flex-wrap: wrap;
    row-gap: 35px;
    column-gap: 84px;
    margin-bottom: 100px;
    &__accordion {
        display: flex;
        flex-direction: column;
        row-gap: 35px;
    }
}

.farther-steps {
    @include flex-between;
    flex-wrap: wrap;
    &__action {
        @include font(600, 40px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    &__btn {
    }
    &__list {
        position: relative;
        max-width: 400px;
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
}

.version-condition {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & * {
        @include font(500, 20px);
        letter-spacing: 0.2px;
    }
    &__definition {
    }
    &__list {
        display: flex;
        gap: 20px;
    }
    &__term {
        color: $gray-dark;
        // min-width: 256px;
    }
    &__title {
        color: $gray-dark;
        margin-bottom: -5px;
        line-height: 140%;
    }
}
.version-description {
    & * {
        @include font(500, 20px);
        letter-spacing: 0.2px;
    }
    &__definition {
    }
    &__term {
        color: $gray-dark;
        margin-bottom: 5px;
    }
}
.version-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 20px;
    & * {
        @include font(500, 16px);
        letter-spacing: 0.16px;
    }
    &__definition {
    }
    &__list {
        display: flex;
        gap: 20px;
    }
    &__term {
        color: $gray-dark;
        // min-width: 256px;
    }
}

.arrange-documents {
}
.arrange-requirements {
    padding-bottom: 60px;
}

.title-primary {
    @include font(600, 50px);
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.title-secondary {
    @include font(600, 24px, 140%);
    letter-spacing: 0.24px;
    text-transform: uppercase;
    opacity: 0.5;
}

::v-deep {
    .features {
        &__item {
            flex: 0 0 500px;
        }
        &__item:nth-child(2) {
            flex: 0 0 605px;
            // order: 3;
        }
        &__img {
            transform: scale(0.7);
        }
    }
}
</style>
