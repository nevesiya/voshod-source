<template>
    <main class="main-leasing">
        <div class="main-leasing__explanation">
            <div class="wrapper">
                <h1 class="main-leasing__explanation-title title-primary">
                    Лизинг
                </h1>
                <div class="main-leasing__explanation-box">
                    <p class="main-leasing__explanation-text">
                        <span>Автолизинг</span>
                        – это финансовая услуга, с помощью которой Вы
                        пользуетесь автомобилем уже сегодня и при закрытии
                        договора получаете его в собственность.
                    </p>
                    <p class="main-leasing__explanation-text">
                        В конце срока лизинга гибкие решения позволяют вам
                        определить, что делать с автомобилем:
                    </p>
                </div>
                <div class="main-leasing__action">
                    <p class="main-leasing__action-text">Продлить договор</p>
                    <p class="main-leasing__action-text">
                        Вернуть автомобиль (и взять новый)
                    </p>
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
                <h2 class="main-leasing__arrange-title title-primary">
                    Как оформить лизинг?
                </h2>
                <div
                    class="main-leasing__arrange-requirements arrange-requirements"
                >
                    <h6 class="main-leasing__arrange-title title-secondary">
                        Общие требования:
                    </h6>
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
                <h6 class="main-leasing__farther-title title-primary">
                    Я подхожу, что дальше?
                </h6>
                <div class="main-leasing__farther-steps farther-steps">
                    <ul class="farther-steps__list">
                        <li class="farther-steps__num">01</li>
                        <li class="farther-steps__action">
                            <p class="farther-steps__action-title">
                                Выбираете программу лизинга
                            </p>
                            <p
                                class="farther-steps__action-title farther-steps__action-title--mobile"
                            >
                                Выбрать автомобиль
                            </p>
                            <p
                                class="farther-steps__action-text farther-steps__action-text--mobile"
                            >
                                Выберите автомобиль из нашего
                                <br />
                                каталога или предложите свой вариант
                            </p>
                        </li>
                    </ul>
                    <ul class="farther-steps__list">
                        <li class="farther-steps__num">02</li>
                        <li class="farther-steps__action">
                            <p class="farther-steps__action-title">
                                Выбираете автомобиль
                            </p>
                            <p
                                class="farther-steps__action-title farther-steps__action-title--mobile"
                            >
                                Обратиться к нам
                            </p>
                            <p
                                class="farther-steps__action-text farther-steps__action-text--mobile"
                            >
                                Обратитесь к нам
                                <br />
                                в любое удобное для вас время
                            </p>
                        </li>
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
                        <li class="farther-steps__action">
                            <p class="farther-steps__action-title">
                                Заключаете договор
                            </p>
                            <p
                                class="farther-steps__action-title farther-steps__action-title--mobile"
                            >
                                Заключаете договор
                            </p>
                            <p
                                class="farther-steps__action-text farther-steps__action-text--mobile"
                            >
                                Договор заключается
                                <br />
                                в течении одного дня
                            </p>
                        </li>
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
                            />
                        </transition>
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
                            После заключения договора вы получаете выбранный
                            автомобиль в долгосрочное пользование с правом
                            выкупа.
                        </p>
                        <ul
                            class="main-leasing__version-description version-description"
                        >
                            <li class="version-description__term">
                                Предмет лизинга
                            </li>
                            <li class="version-description__definition">
                                Новые автомобили
                            </li>
                        </ul>
                        <div
                            class="main-leasing__version-condition version-condition"
                        >
                            <h6 class="version-condition__title">Условия:</h6>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">
                                    Первоначальный взнос
                                </dt>
                                <dd class="version-condition__definition">
                                    от 10 до 30% от стоимости а/м
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Срок</dt>
                                <dd class="version-condition__definition">
                                    от 1 до 5 лет
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">
                                    Условия выкупа
                                </dt>
                                <dd class="version-condition__definition">
                                    1000 ₽
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div class="main-leasing__version-box">
                        <h6 class="main-leasing__version-title">с пробегом</h6>
                        <p class="main-leasing__version-text">
                            После завершения срока договора право собственности
                            на автомобиль переходит к вам
                        </p>
                        <ul
                            class="main-leasing__version-description version-description"
                        >
                            <li class="version-description__term">
                                Предмет лизинга
                            </li>
                            <li class="version-description__definition">
                                Автомобили с пробегом
                            </li>
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
                                <dd class="version-info__definition">
                                    не более 140 тыс. км.
                                </dd>
                            </dl>
                            <dl class="version-info__list">
                                <dt class="version-info__term">
                                    Тех. состояние
                                </dt>
                                <dd class="version-info__definition">
                                    а/м технически исправен, комплектен,
                                    повреждений нет наличие 2х ключей
                                </dd>
                            </dl>
                        </div>
                        <div
                            class="main-leasing__version-condition version-condition"
                        >
                            <h6 class="version-condition__title">Условия:</h6>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">
                                    Первоначальный взнос
                                </dt>
                                <dd class="version-condition__definition">
                                    от 10 до 30% от стоимости а/м
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">Срок</dt>
                                <dd class="version-condition__definition">
                                    от 1 до 5 лет
                                </dd>
                            </dl>
                            <dl class="version-condition__list">
                                <dt class="version-condition__term">
                                    Условия выкупа
                                </dt>
                                <dd class="version-condition__definition">
                                    1000 ₽
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-leasing__question">
            <div class="wrapper">
                <h2 class="main-leasing__question-title title-primary">
                    <span class="title-primary">часто задаваемые</span>
                    <span class="title-primary">Вопросы</span>
                </h2>
                <p class="main-leasing__question-text">
                    В разделе
                    <router-link to="/questions">Вопросы</router-link>
                    , вы также можете получить ответы по вопросам аренды
                    автомобиля
                </p>
                <lazy-load-container @intersect="getFaqLaasing()">
                    <div
                        class="main-leasing__question-wrapper question-leasing"
                    >
                        <div class="question-leasing__accordion">
                            <BaseQuestion
                                :questions="questionsLeasing"
                                :start-slice="0"
                                :end-slice="5"
                            />
                        </div>
                        <div class="question-leasing__accordion">
                            <BaseQuestion
                                :questions="questionsLeasing"
                                :start-slice="5"
                            />
                        </div>
                    </div>
                </lazy-load-container>
                <div class="main-leasing__question-contact question-contact">
                    <h6 class="question-contact__title">
                        Не нашли ответ на свой вопрос?
                    </h6>
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

            this.questionsLeasing = await fetchData(
                `${import.meta.env.BASE_URL}${path}`
            )
        }
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
.main-leasing {
    overflow: hidden;
    &__action {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-left: 36px;
    }
    &__action-text {
        @include font(400, clamp(0.75rem, 0.713rem + 0.188vw, 0.938rem), 140%);
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
            min-width: 50px;
            height: 50px;
            display: inline-block;
            padding: 10px;
            border-radius: 2px;
            box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
            margin-right: 20px;
        }
    }
    &__advantage {
        padding: 50px 0 42px;
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
        background: linear-gradient(
            180deg,
            #fff 0%,
            rgba(255, 255, 255, 0) 100%
        );
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
        align-items: center;
        @include font(500, clamp(0.75rem, 0.7rem + 0.25vw, 1rem), 140%);

        &::before {
            content: '';
            background: url(@/assets/images/check-circle.svg);
            display: inline-block;
            width: 22px;
            height: 22px;
            padding-right: 20px;
            margin-right: 10px;
        }
    }
    &__arrange-documents {
    }
    &__arrange-requirements {
    }
    &__explanation {
        position: relative;
        margin: 80px 0 50px;

        & .wrapper {
            &::before {
                content: '';
                display: block;
                position: absolute;
                @include line(6px, 100%, $red-dark);
            }
        }
    }
    &__explanation-box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 40px;
        max-width: 635px;
        margin-left: 36px;
    }
    &__explanation-text {
        @include font(500, clamp(0.75rem, 0.7rem + 0.25vw, 1rem), 140%);
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
    }
    &__farther-title {
        margin-bottom: 239px;
    }
    &__question {
        padding: 120px 0 100px;
    }
    &__question-title {
        margin-bottom: 60px;
        & span:nth-child(1) {
            display: none;
        }
    }
    &__question-text {
        display: none;
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
        }
        & dt::after {
            content: ' .....................................................................................';
        }
    }
    &__version-content {
        @include flex-between;
        gap: 20px;
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
        @include font(500, clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem), 140%);
        letter-spacing: 0.2px;
        margin-bottom: 30px;
    }
    &__version-title {
        @include font(600, clamp(1.25rem, 0.6rem + 3.25vw, 4.5rem), 140%);
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
    row-gap: 35px;
    column-gap: 50px;
    margin-bottom: 100px;
    &__accordion {
        display: flex;
        flex-direction: column;
        row-gap: 35px;
    }
}

.farther-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    &__action {
        margin-bottom: 20px;
    }
    &__action-title {
        @include font(600, clamp(0.875rem, 0.55rem + 1.625vw, 2.5rem));
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }
    &__action-title--mobile,
    &__action-text--mobile {
        display: none;
    }
    &__action-text {
        display: none;
    }
    &__btn {
    }
    &__list {
        position: relative;
        max-width: 396px;
        &:nth-child(1) {
            &::before {
                content: '';
                background: url(@/assets/images/rounded-line.svg);
                background-repeat: no-repeat;
                background-position: left;
                background-size: contain;
                position: absolute;
                height: 100%;
                width: 100%;
                transform: translate(-10%, 75%);
            }
        }
    }

    &__num {
        @include font(700, clamp(3.25rem, 1.15rem + 10.5vw, 13.75rem));
        font-family: Lato, sans-serif;
        color: $gray-light;
        position: absolute;
        z-index: -1;
        left: 45%;
        bottom: 45%;
    }
}

.version-condition {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & * {
        @include font(500, clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem));
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
    }
    &__title {
        color: $gray-dark;
        margin-bottom: -5px;
        line-height: 140%;
    }
}
.version-description {
    & * {
        @include font(500, clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem));
        letter-spacing: 0.2px;
    }
    &__definition {
    }
    &__term {
        color: $gray-dark;
        margin-bottom: 5px;
        &::after {
            content: ':';
        }
    }
}
.version-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 20px;
    & * {
        @include font(500, clamp(0.75rem, 0.7rem + 0.25vw, 1rem));
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
    }
}

.arrange-documents {
}
.arrange-requirements {
    padding-bottom: 60px;
}

.title-primary {
    @include font(600, clamp(1.25rem, 0.817rem + 1.923vw, 3.125rem));
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.title-secondary {
    @include font(600, clamp(1rem, 0.9rem + 0.5vw, 1.5rem), 140%);
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
            flex: 0 0 min(100%, 605px);
        }
        &__img {
            transform: scale(0.7);
        }
    }
}

@include media-query(1530px) {
    .farther-steps {
        &__list {
            max-width: 300px;
            &:nth-child(1) {
                &::before {
                    transform: translate(0%, 85%);
                }
            }
        }
    }
}

@include media-query($xxl) {
    .main-leasing {
        &__advantage-list {
            column-gap: 42px;
        }
        &__farther-title {
            margin-bottom: 140px;
        }
    }

    .farther-steps {
        &__list {
            &:nth-child(1) {
                &::before {
                }
            }
        }
    }
}

@include media-query($xl) {
    ::v-deep {
        .features {
            &__item {
                flex: 0 1 100%;
            }
            &__item:nth-child(2) {
                flex: 0 1 min(100%, 700px);
            }
        }
    }
    .main-leasing {
        &__advantage-list {
            column-gap: 42px;
        }
    }
    .farther-steps {
        &__list {
            max-width: 250px;
        }
    }
}
@include media-query($lg) {
    .farther-steps {
        gap: 0;
        &__list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 100%;
            width: 70vw;
            width: clamp(320px, 100vw, 550px);
            &:nth-child(1)::before {
                display: none;
            }
            &:nth-child(1) .farther-steps__num {
                color: $red-dark;
            }
            &:nth-child(1) .farther-steps__num::before {
                content: '';
                background: url(@/assets/images/curve-arrow.svg);
                background-repeat: no-repeat;
                background-size: contain;
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                transform: translate(-90%, 190%) scale(2.8);
            }
            &:nth-child(1) .farther-steps__num::after {
                content: '';
                background: url(@/assets/images/circle-incomplete.svg);
                background-repeat: no-repeat;
                background-size: contain;
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                left: 0%;
                top: 7%;
                transform: scale(1.3);
            }
        }
        &__num {
            order: 1;
            position: relative;
            left: 0;
            bottom: 0;
            transform: translate(0, 0);
        }
        &__action {
            margin-bottom: 0;
            max-width: 400px;
        }
        &__action-title {
            display: none;
            text-transform: none;
            margin-bottom: 8px;
        }
        &__action-text {
            font-size: clamp(0.75rem, 0.631rem + 0.595vw, 1rem);
        }
        &__action-title--mobile {
            display: block;
        }
        &__action-text--mobile {
            display: block;
        }
        &__btn {
            display: none;
        }
    }

    .main-leasing {
        &__farther {
            padding: 100px 0px 80px;
        }
        &__farther-title {
            margin-bottom: 100px;
        }
        &__version-content {
            flex-wrap: wrap;
            gap: 40px;
        }
        &__version-box {
            width: 100%;
        }
        &__version-description {
            margin-bottom: 0;
        }
        &__version {
            & dt::after {
                content: '';
            }
        }
        &__question {
        }
    }

    .version-description {
        display: flex;
        justify-content: space-between;
        background: #222;
        align-items: center;
        padding: 12px 16px;
        margin-bottom: 0;
        &__term {
            margin-bottom: 0;
            color: $gray-light;
            &::after {
                content: '';
            }
        }
        &__definition {
            color: $white;
        }
    }

    .version-condition,
    .version-info {
        padding-bottom: 0px;
        gap: 0;
        &__title {
            display: none;
        }
        &__list {
            justify-content: space-between;
            gap: 25px;
            padding: 16px;
            background: #f2f3f6;
            &:nth-child(3) {
                background: #fff;
            }
        }
        &__term {
            min-width: 150px;
        }
        &__definition {
            text-align: end;
        }
    }

    .version-info {
        border-bottom: 2px solid rgb(231, 231, 232);
        & * {
            @include font(500, clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem));
            letter-spacing: 0.2px;
        }
        &__definition {
            max-width: 280px;
        }
        &__list {
            &:nth-child(2) {
                background: #fff;
            }
            &:nth-child(3) {
                background: #f2f3f6;
            }
        }
    }
}

@include media-query($md) {
    .title-primary {
        font-weight: 500;
    }

    .main-leasing {
        &__explanation {
            margin: 0;
            padding: 50px 0;
            box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
            .wrapper {
                &::before {
                    display: none;
                }
            }
        }
        &__explanation-title {
            margin-bottom: 12px;
            &::after {
                content: '';
                width: 60px;
                height: 4px;
                background: #bf3535;
                display: block;
                margin-top: 5px;
            }
        }
        &__explanation-title {
            margin-left: 0;
        }
        &__explanation-box {
            margin-left: 0;
        }
        &__explanation-text {
            margin-left: 0;
            font-weight: 400;

            & span {
                font-weight: 600;
            }
        }
        &__action {
            margin-left: 0;
        }

        &__advantage-list {
            row-gap: 32px;
        }

        &__arrange {
            padding: 50px 0;
            box-shadow: inset 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
        }

        &__arrange-title {
            margin-bottom: 32px;
        }

        &__arrange-requirements {
            padding-bottom: 32px;
            & .title-secondary {
                margin-bottom: 16px;
            }
        }
        &__arrange-documents {
            & .title-secondary {
                margin-bottom: 16px;
            }
        }
        &__arrange-list {
            gap: 12px;
        }
        &__farther {
            padding: 50px 0;
        }
        &__farther-title {
            margin-bottom: 50px;
        }
        &__version {
            padding-top: 20px;
        }
        &__version-title {
            position: relative;
        }
        &__version-box:nth-child(1) {
            .main-leasing__version-title::after {
                content: '';
                background: url(@/assets/images/circle-for-version-new.svg);
                background-repeat: no-repeat;
                background-size: contain;
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                transform: translate(22%, -100%) scale(1.5);
            }
        }
        &__version-box:nth-child(2) {
            .main-leasing__version-title::after {
                content: '';
                background: url(@/assets/images/circle-for-version-mileage.svg);
                background-repeat: no-repeat;
                background-size: contain;
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                transform: translate(22%, -100%) scale(1.5);
            }
        }
        &__question {
            padding: 50px 0;
        }
        &__question-title {
            position: relative;
            margin-bottom: 32px;
            &::after {
                content: '';
                display: block;
                position: absolute;
                @include line(6px, 100%, #bf3535);
                top: 0;
            }
            & span {
                margin-left: 30px;
            }
            & span:nth-child(1) {
                display: block;
            }
        }
        &__question-text {
            display: block;
            margin-bottom: 44px;
            @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
            font-style: italic;
            color: $gray-dark;
            & * {
                @include font(500, clamp(0.75rem, 0.692rem + 0.256vw, 1rem));
                font-style: italic;
                color: $gray-dark;
            }
        }
    }

    .question-leasing {
        flex-wrap: wrap;
        row-gap: 25px;
        margin-bottom: 60px;
        &__accordion {
            row-gap: 25px;
            width: 100%;
        }
    }

    ::v-deep {
        .features {
            &__term {
                margin-bottom: 8px;
                &::after {
                    content: '';
                    display: block;
                    margin-top: 8px;
                    @include line(30px, 4px);
                }
            }
            &__img-box {
                transform: scale(0.8);
                min-width: 80px;
                min-height: 80px;
            }
            &__img {
                min-width: 80px;
                min-height: 80px;
            }
        }
        .accordion-item {
            max-width: 100%;
        }
    }
}

@include media-query($sm) {
    .farther-steps {
        gap: 20px;
    }
    .main-leasing {
        &__version {
            padding-top: 0px;
        }
    }
}

@include media-query($xs) {
    .main-leasing {
        &__explanation {
            padding: 24px 0;
        }
        &__action-text {
            width: auto;
        }
        &__explanation-box {
            gap: 8px;
            margin-bottom: 24px;
        }
        &__action {
            gap: 8px;
        }
        &__action-text {
            box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.05);
        }

        &__advantage {
            padding: 32px 0 36px;
        }

        &__advantage-title {
            margin-bottom: 32px;
        }

        &__arrange {
            padding: 24px 0;
        }
        &__farther {
            padding: 24px 0;
        }
        &__farther-title {
            margin-bottom: 24px;
        }
        &__question {
            padding: 40px 0;
        }
        &__question-title {
            &::after {
                @include line(4px, 100%, #bf3535);
            }
            & span {
                margin-left: 16px;
            }
        }
    }

    .farther-steps {
        &__list {
            &:nth-child(1) .farther-steps__num::before {
                transform: translate(-90%, 200%) scale(3);
            }
        }
    }

    .question-leasing {
        margin-bottom: 40px;
        &__accordion {
            row-gap: 14px;
        }
    }

    .main-leasing {
        &__question {
        }
    }

    .question-contact {
        &::before {
            @include line(4px, 100%, #bf3535);
        }
        & * {
            font-size: 12px;
        }
        & *:not(a) {
            margin-left: 16px;
        }
        &__title {
            @include font(600, 14px);
            margin-bottom: 12px;
        }
        &__info {
        }
        &__open-hour {
            margin-bottom: 8px;
        }
        &__tel {
            margin-bottom: 8px;
        }
    }

    ::v-deep {
        .features {
            &__img-box {
                transform: scale(0.55);
                margin-left: -16px;
                margin-right: 0px;
            }
        }
    }
}

@include media-query($xxs) {
    .farther-steps {
        &__list {
            &:nth-child(1) .farther-steps__num::before {
                content: '';
                background: url(@/assets/images/curve-arrow.svg);
                background-repeat: no-repeat;
                background-size: contain;
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                transform: translate(-70%, 222%) scale(3.3);
            }
        }
    }
}
</style>
