<template>
    <main class="main">
        <div class="wrapper">
            <div class="main-question">
                <h1 class="main-question__title title-primary">
                    <span class="main-question__title-minor">Часто задаваемые </span>
                    <span class="main-question__title-main">вопросы</span>
                </h1>
                <p class="main-question__text">
                    Список ответов на часто задаваемые вопросы от наших клиентов постоянно
                    пополняется.
                </p>
                <p class="main-question__text">Напишите нам, чтобы мы могли дополнить список.</p>

                <div class="main-question__wrapper">
                    <div class="main-question__section">
                        <h6
                            @click="(showLeasing = true), (showRent = false)"
                            class="main-question__leasing-title question-title"
                            :class="{ 'question-title--active': showLeasing }"
                        >
                            Лизинг
                        </h6>
                        <h6
                            @click="(showRent = true), (showLeasing = false)"
                            class="main-question__rent-title question-title"
                            :class="{ 'question-title--active': showRent }"
                        >
                            Аренда
                        </h6>
                    </div>
                    <Transition name="collapse">
                        <div v-show="showLeasing" class="main-question__leasing">
                            <div class="main-question__wrapper question-leasing">
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
                        </div>
                    </Transition>
                    <Transition name="collapse">
                        <div v-show="showRent" class="main-question__rent">
                            <div class="main-question__wrapper question-rent">
                                <div class="question-rent__accordion">
                                    <BaseQuestion
                                        :questions="questionsRent"
                                        :start-slice="0"
                                        :end-slice="5"
                                    />
                                </div>
                                <div class="question-rent__accordion">
                                    <BaseQuestion :questions="questionsRent" :start-slice="5" />
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
                <div class="main-question__contact question-contact">
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
import BaseFooter from "@/components/BaseFooter.vue"
import BaseQuestion from "@/components/BaseQuestion.vue"

import { fetchData } from "@/utils/apiUtils"

export default {
    components: {
        BaseFooter,
        BaseQuestion
    },
    data() {
        return {
            questionsLeasing: "",
            questionsRent: "",
            showLeasing: true,
            showRent: false
        }
    },
    methods: {
        async getFaqLaasing() {
            const path = import.meta.env.DEV
                ? `public/data/leasing_faq.json`
                : `data/leasing_faq.json`

            this.questionsLeasing = await fetchData(`${import.meta.env.BASE_URL}${path}`)
        },
        async getFaqRent() {
            const path = import.meta.env.DEV ? `public/data/rent_faq.json` : `data/rent_faq.json`

            this.questionsRent = await fetchData(`${import.meta.env.BASE_URL}${path}`)
        }
    },
    mounted() {
        this.getFaqLaasing()
        this.getFaqRent()
    }
}
</script>

<style scoped lang="scss">
.accordion {
}
.main {
}
.main-question {
    padding: 40px 0px 60px;
    &__contact {
    }
    &__leasing {
    }
    &__leasing-title {
    }
    &__rent {
    }
    &__rent-title {
    }
    &__section {
        display: flex;
        gap: 25px;
    }
    &__text {
        @include font(500, 16px, 140%);
        letter-spacing: 0.16px;
        color: $gray-dark;
        &:nth-child(3) {
            margin-bottom: 60px;
        }
    }
    &__title {
        margin-bottom: 20px;
    }
    &__wrapper {
        position: relative;
        margin-bottom: 100px;
    }
}
.question-contact {
    position: relative;
    &::before {
        content: "";
        display: block;
        position: absolute;
        @include line(6px, 100%, #bf3535);
    }
    & * {
        @include font(500, 16px, 140%);
        letter-spacing: 0.32px;
    }
    & *:not(a) {
        margin-left: 30px;
    }
    &__info {
        color: $red-dark;
    }
    &__open-hour {
        margin-bottom: 10px;
    }
    &__tel {
        margin-bottom: 10px;
    }
    &__title {
        @include font(600, 24px, 140%);
        letter-spacing: 0.48px;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
}

.question-leasing {
    display: flex;
    justify-content: space-between;
    column-gap: 50px;
    &__accordion {
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }
}

.question-rent {
    display: flex;
    justify-content: space-between;
    column-gap: 50px;
    &__accordion {
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }
}

.question-title {
    @include font(600, 24px);
    letter-spacing: 0.24px;
    text-transform: uppercase;
    margin-bottom: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        opacity: 0.7;
    }
    &::after {
        content: "";
        display: block;
        @include line(100%, 2px, $gray-light);
        border-radius: 5px;
        margin-top: 10px;
        transition: all 0.2s ease-in-out;
    }
}

.question-title--active {
    &::after {
        content: "";
        display: block;
        @include line(100%, 2px, #bf3535);
        border-radius: 5px;
        margin-top: 10px;
    }
}

.title-primary,
.title-primary * {
    @include font(600, 50px);
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

@include media-query($md) {
    .main-question {
        &__wrapper {
            flex-wrap: wrap;
            row-gap: 35px;
        }
    }

    .question-leasing {
        &__accordion {
            width: 100%;
        }
    }

    ::v-deep {
        .accordion-item {
            max-width: 100%;
        }
    }
}

@include media-query($sm) {
    .main-question {
        &__title-minor {
            display: none;
        }
    }
    .question-title {
        font-size: 20px;
        margin-bottom: 40px;
    }

    .title-primary,
    .title-primary * {
        @include font(500, 40px);
    }
}

@include media-query($xs) {
    .main-question {
        padding: 24px 0 40px;
        &__title {
            margin-bottom: 16px;
        }
        &__text {
            @include font(500, 12px);
        }
        &__wrapper {
            row-gap: 24px;
            margin-bottom: 48px;
        }
    }
    .question-leasing {
        &__accordion {
            row-gap: 14px;
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

    .title-primary,
    .title-primary * {
        font-size: 32px;
    }

    .question-title {
        @include font(600, 16px);
    }
}
</style>
