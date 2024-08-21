<template>
    <div class="wrapper">
        <div class="privacy-police">
            <div class="privacy-police__header">
                <img
                    @click="$router.go(-1)"
                    src="@/assets/images/arrow-right-black.svg"
                    class="privacy-police__header-back"
                    alt="arrow back"
                />
                <img
                    src="@/assets/images/logo-black.svg"
                    alt="logo"
                    class="privacy-police__logo"
                />
                <img
                    @click="showModalCallback = true"
                    src="@/assets/images/icon-phone-black.svg"
                    class="privacy-police__header-callback"
                    alt="icon phone"
                />
            </div>
            <div class="privacy-police__body">
                <h5 class="privacy-police__title">
                    Политика конфиденциальности
                </h5>
                <div class="privacy-police__body-paragraph">
                    <h6 class="privacy-police__body-title">
                        1. Общие положения
                    </h6>
                    <p class="privacy-police__body-text">
                        Настоящая политика обработки персональных данных
                        составлена в соответствии с требованиями Федерального
                        закона от 27.07.2006. № 152-ФЗ «О персональных данных»
                        (далее — Закон о персональных данных) и определяет
                        порядок обработки персональных данных и меры по
                        обеспечению безопасности персональных данных,
                        предпринимаемые Михайловым Иваном Сергеевичем (далее —
                        Оператор).
                    </p>
                    <p class="privacy-police__body-item">
                        <span>1.1.</span>
                        Оператор ставит своей важнейшей целью и условием
                        осуществления своей деятельности соблюдение прав и
                        свобод человека и гражданина при обработке его
                        персональных данных, в том числе защиты прав на
                        неприкосновенность частной жизни, личную и семейную
                        тайну.
                    </p>
                    <p class="privacy-police__body-item">
                        <span>1.2.</span>
                        Настоящая политика Оператора в отношении обработки
                        персональных данных (далее — Политика) применяется ко
                        всей информации, которую Оператор может получить о
                        посетителях веб-сайта
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>
                </div>
                <div class="privacy-police__body-paragraph">
                    <h6 class="privacy-police__body-title">
                        2. Основные понятия, используемые в Политике
                    </h6>
                    <p class="privacy-police__body-item">
                        <span>2.1.</span>
                        Автоматизированная обработка персональных данных —
                        обработка персональных данных с помощью средств
                        вычислительной техники.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.2.</span>
                        Блокирование персональных данных — временное прекращение
                        обработки персональных данных (за исключением случаев,
                        если обработка необходима для уточнения персональных
                        данных).
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.3.</span>
                        Веб-сайт — совокупность графических и информационных
                        материалов, а также программ для ЭВМ и баз данных,
                        обеспечивающих их доступность в сети интернет по
                        сетевому адресу
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.4.</span>
                        Информационная система персональных данных —
                        совокупность содержащихся в базах данных персональных
                        данных и обеспечивающих их обработку информационных
                        технологий и технических средств.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.5.</span>
                        Обезличивание персональных данных — действия, в
                        результате которых невозможно определить без
                        использования дополнительной информации принадлежность
                        персональных данных конкретному Пользователю или иному
                        субъекту персональных данных.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.6.</span>
                        Обработка персональных данных — любое действие
                        (операция) или совокупность действий (операций),
                        совершаемых с использованием средств автоматизации или
                        без использования таких средств с персональными данными,
                        включая сбор, запись, систематизацию, накопление,
                        хранение, уточнение (обновление, изменение), извлечение,
                        использование, передачу (распространение,
                        предоставление, доступ), обезличивание, блокирование,
                        удаление, уничтожение персональных данных.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.7.</span>
                        Оператор — государственный орган, муниципальный орган,
                        юридическое или физическое лицо, самостоятельно или
                        совместно с другими лицами организующие и/или
                        осуществляющие обработку персональных данных, а также
                        определяющие цели обработки персональных данных, состав
                        персональных данных, подлежащих обработке, действия
                        (операции), совершаемые с персональными данными.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.8.</span>
                        Персональные данные — любая информация, относящаяся
                        прямо или косвенно к определенному или определяемому
                        Пользователю веб-сайта
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>
                </div>
                <div class="privacy-police__body-paragraph">
                    <h6 class="privacy-police__body-title">
                        1. Общие положения
                    </h6>
                    <p class="privacy-police__body-text">
                        Настоящая политика обработки персональных данных
                        составлена в соответствии с требованиями Федерального
                        закона от 27.07.2006. № 152-ФЗ «О персональных данных»
                        (далее — Закон о персональных данных) и определяет
                        порядок обработки персональных данных и меры по
                        обеспечению безопасности персональных данных,
                        предпринимаемые Михайловым Иваном Сергеевичем (далее —
                        Оператор).
                    </p>
                    <p class="privacy-police__body-item">
                        <span>1.1.</span>
                        Оператор ставит своей важнейшей целью и условием
                        осуществления своей деятельности соблюдение прав и
                        свобод человека и гражданина при обработке его
                        персональных данных, в том числе защиты прав на
                        неприкосновенность частной жизни, личную и семейную
                        тайну.
                    </p>
                    <p class="privacy-police__body-item">
                        <span>1.2.</span>
                        Настоящая политика Оператора в отношении обработки
                        персональных данных (далее — Политика) применяется ко
                        всей информации, которую Оператор может получить о
                        посетителях веб-сайта
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>
                </div>
                <div class="privacy-police__body-paragraph">
                    <h6 class="privacy-police__body-title">
                        2. Основные понятия, используемые в Политике
                    </h6>
                    <p class="privacy-police__body-item">
                        <span>2.1.</span>
                        Автоматизированная обработка персональных данных —
                        обработка персональных данных с помощью средств
                        вычислительной техники.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.2.</span>
                        Блокирование персональных данных — временное прекращение
                        обработки персональных данных (за исключением случаев,
                        если обработка необходима для уточнения персональных
                        данных).
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.3.</span>
                        Веб-сайт — совокупность графических и информационных
                        материалов, а также программ для ЭВМ и баз данных,
                        обеспечивающих их доступность в сети интернет по
                        сетевому адресу
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.4.</span>
                        Информационная система персональных данных —
                        совокупность содержащихся в базах данных персональных
                        данных и обеспечивающих их обработку информационных
                        технологий и технических средств.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.5.</span>
                        Обезличивание персональных данных — действия, в
                        результате которых невозможно определить без
                        использования дополнительной информации принадлежность
                        персональных данных конкретному Пользователю или иному
                        субъекту персональных данных.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.6.</span>
                        Обработка персональных данных — любое действие
                        (операция) или совокупность действий (операций),
                        совершаемых с использованием средств автоматизации или
                        без использования таких средств с персональными данными,
                        включая сбор, запись, систематизацию, накопление,
                        хранение, уточнение (обновление, изменение), извлечение,
                        использование, передачу (распространение,
                        предоставление, доступ), обезличивание, блокирование,
                        удаление, уничтожение персональных данных.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.7.</span>
                        Оператор — государственный орган, муниципальный орган,
                        юридическое или физическое лицо, самостоятельно или
                        совместно с другими лицами организующие и/или
                        осуществляющие обработку персональных данных, а также
                        определяющие цели обработки персональных данных, состав
                        персональных данных, подлежащих обработке, действия
                        (операции), совершаемые с персональными данными.
                    </p>

                    <p class="privacy-police__body-item">
                        <span>2.8.</span>
                        Персональные данные — любая информация, относящаяся
                        прямо или косвенно к определенному или определяемому
                        Пользователю веб-сайта
                        <a href="#">https://thismywebsite.com</a>
                        .
                    </p>
                </div>
            </div>
            <BaseFooterSimple
                :showPrivacyPolice="false"
                class="privacy-police__footer"
            />
            <button class="privacy-police__btn-back" @click="$router.go(-1)">
                Вернуться
            </button>
        </div>
    </div>
    <Teleport to="body">
        <transition name="fade">
            <ModalCallback
                v-if="showModalCallback"
                :show-modal="showModalCallback"
                @close-modal="showModalCallback = false"
            />
        </transition>
    </Teleport>
</template>

<script>
import BaseFooterSimple from '@/components/BaseFooterSimple.vue';
import ModalCallback from '@/components/UI/Modal/ModalCallback.vue';

export default {
    components: {
        BaseFooterSimple,
        ModalCallback,
    },
    data() {
        return {
            showModalCallback: false,
        };
    },
    mounted() {
        let btnTop = document.querySelector('.scroll-top');
        btnTop.classList.add('scroll-top--use');
    },
    unmounted() {
        let btnTop = document.querySelector('.scroll-top');
        btnTop.classList.remove('scroll-top--use');
    },
};
</script>

<style scoped lang="scss">
.privacy-police {
    display: flex;
    flex-direction: column;
    max-width: 880px;

    margin: 0 auto;
    &__logo {
        height: 41px;
    }
    &__header {
        @include adaptive-value('margin-bottom', 45, 24);
        align-self: center;
        padding: 20px 0;
    }

    &__header-back {
        display: none;
    }
    &__header-callback {
        display: none;
    }
    &__body {
        display: flex;
        flex-direction: column;
        @include adaptive-value('gap', 40, 24);
        margin-bottom: 40px;

        & a {
            @include font(500, clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem));
            color: $red-dark !important;
        }
    }
    &__title {
        @include font(500, clamp(1.25rem, 0.962rem + 1.282vw, 2.5rem), 100%);
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    &__body-title {
        @include font(500, clamp(1rem, 0.885rem + 0.513vw, 1.5rem));
        @include adaptive-value('margin-bottom', 20, 12);
    }
    &__body-text {
        @include font(inherit, clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem));
        @include adaptive-value('margin-bottom', 20, 12);
    }
    &__body-item {
        @include font(
            inherit,
            clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem),
            140%
        );
        @include adaptive-value('padding-left', 20, 16);
        & span {
            @include font(
                700,
                clamp(0.75rem, 0.721rem + 0.128vw, 0.875rem),
                140%
            );
        }
        &:not(:last-child) {
            @include adaptive-value('margin-bottom', 15, 12);
        }
    }
    &__footer {
        @include font(400, 14px);
        color: $gray-dark;
    }
    &__btn-back {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(calc(-50% - 440px - 85px));
        cursor: pointer;
        padding: 12px;
        border-radius: 8px;
        background: #111;
        z-index: 99;
        color: $white;
        transition: all 0.2s ease-in-out;
        &::before {
            content: '';
            background-image: url(@/assets/images/arrow-right-small-white.svg);
            background-repeat: no-repeat;
            background-position: center;
            display: inline-block;
            width: 8px;
            height: 13px;
            margin-right: 10px;
            transition: transform 0.2s ease-in-out;
            transform: rotate(180deg);
        }
        &:hover::before {
            transform: translateX(-5px) rotate(180deg);
        }
        &:hover {
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.3);
        }
    }

    a {
        color: $black;
    }
}

::v-deep {
    .footer-simple {
        & .wrapper {
            width: 100%;
        }
        &__copyright {
            color: $gray-dark;
        }
        &__offer {
            color: $gray-dark;
            text-decoration: underline;
        }
        &__privacy-police {
            display: none;
        }
    }
}

@include media-query($xl) {
    .privacy-police {
        &__btn-back {
            display: none;
        }
        &__header {
            @include flex-between();
            position: sticky;
            top: 0;
            width: 100vw;
            padding: 16px;
            align-items: center;
            background: $white;
            box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.07);
        }
        &__logo {
            @include adaptive-value('height', 41, 24, 1, 1200);
        }
        &__header-back {
            display: block;
            @include adaptive-value('height', 24, 20, 1, 1200);
            @include adaptive-value('width', 32, 20, 1, 1200);
            transform: rotate(180deg);
        }
        &__header-callback {
            display: block;
            @include adaptive-value('height', 34, 20, 1, 1200);
        }
    }

    .scroll-top.scroll-top--use {
        transform: translate(-16px, -16px) !important;
    }

    ::v-deep {
        .footer-simple {
            justify-content: center;
            &__offer {
                display: none;
            }
        }
    }
}

@include media-query($xs) {
    .privacy-police {
        &__title {
            font-weight: 600;
        }
    }
}
</style>

<style lang="scss">
.scroll-top--use {
    position: fixed;
    right: calc(50% - 440px - 85px);
    transform: translate(0, -20px);
}

@include media-query($xl) {
    .scroll-top--use {
        transform: translate(-16px, -16px);
        right: 0;
    }
}
</style>
