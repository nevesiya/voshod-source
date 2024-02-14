<template>
    <div class="box-footer">
        <BaseFooter :styleMap="styleMap" :showCheckbox="true" />
    </div>
</template>

<script>
import BaseFooter from "@/components/BaseFooter.vue"

export default {
    components: {
        BaseFooter
    },
    data() {
        return {
            styleMap: {
                width: 100 + "%",
                height: 100 + "%"
            }
        }
    }
}
</script>

<style scoped lang="scss">
.footer {
    display: block;
}

::v-deep {
    .footer {
        &__bg {
            display: none;
        }

        &__wrapper {
            align-content: flex-start;
            padding: 50px 16px;
            margin: 0 auto;
            max-width: 1420px;
        }
        &__contact {
            background: none;
            & * {
                color: $black;
            }
        }
        &__form {
            position: absolute;
            left: 51%;
            transform: translateX(-1%);
            top: 130px;
            bottom: 0px;
            min-width: 680px;
            min-height: 589px;
            padding: 80px 100px 60px;
            border-radius: 2px;
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
        }
        &__info {
        }
        &__info-social {
            margin: 0px;
        }
        &__info-other {
            display: none;
        }
        &__info-title {
            &:nth-child(1)::before {
                content: "";
                background: url(@/assets/images/icon-mark-black.svg);
                background-repeat: no-repeat;
            }
            &:nth-child(3)::before {
                content: "";
                background: url(@/assets/images/icon-clock-black.svg);
                background-repeat: no-repeat;
            }
            &:nth-child(5)::before {
                content: "";
                background: url(@/assets/images/icon-phone-black.svg);
                background-repeat: no-repeat;
            }
        }
        &__map {
            width: 100%;
            position: static;
            height: min(100vh, 1000px);
        }
        &__social-link {
            border: 2px solid $black;
            filter: drop-shadow(0px 0px 11.136709213256836px rgba(0, 0, 0, 0.3));

            &:nth-child(1) {
                background: url(@/assets/images/logo-vk-black.svg);
                background-repeat: no-repeat;
                background-position: 7px 13px;
                transition: all 0.2s ease-in-out;
                &:hover {
                    background: url(@/assets/images/logo-vk.svg), $black;
                    background-repeat: no-repeat;
                    background-position: 7px 13px;
                    opacity: 1;
                }
            }

            &:nth-child(2) {
                background: url(@/assets/images/logo-telegram-black.svg);
                background-repeat: no-repeat;
                background-position: 8px 11px;
                transition: all 0.2s ease-in-out;
                &:hover {
                    background: url(@/assets/images/logo-telegram.svg), $black;
                    background-repeat: no-repeat;
                    background-position: 8px 11px;
                    opacity: 1;
                }
            }
        }
    }
}

.box-footer::v-deep {
    .form {
        &__box:nth-child(1),
        &__box:nth-child(2) {
            width: 100%;
        }
        &__box:nth-child(3),
        &__box:nth-child(4) {
            width: 232px;
        }
        &__text {
            width: 100%;
        }
        &__submit {
            border: 2px solid $black;

            &:hover {
                color: $white;
                background: $black;
            }
        }
    }
}

::v-deep {
    .footer-simple {
        display: none;
    }
}

@include media-query($xxl) {
    ::v-deep {
        .footer {
            &__form {
                left: calc(100% + -16px);
                transform: translateX(-100%);
                padding: 60px 80px 40px;
                min-width: 640px;
                min-height: 569px;
            }
        }
    }
}

@include media-query($xl) {
    ::v-deep {
        .footer {
            &__form {
                left: 50%;
                transform: translateX(-50%);
                bottom: 76px;
                min-width: 580px;
                min-height: 460px;
                padding: 29px 40px;
                top: auto;
            }
            &__map {
                position: relative;
            }
        }
    }
}

@include media-query($md) {
    ::v-deep {
        .footer {
            &__form {
                min-width: 465px;
                min-height: 350px;
                padding: 25px 25px;
            }
        }
    }

    .box-footer::v-deep {
        .form {
            &__box:nth-child(1),
            &__box:nth-child(2) {
                width: 200px;
            }
            &__box:nth-child(3),
            &__box:nth-child(4) {
                width: 200px;
            }
            &__text {
                width: 100%;
                height: 81px;
            }
            &__input-other {
                .form__box {
                    width: 100%;
                    height: auto;
                }
            }
            &__checkbox-label {
                font-size: 12px;
            }
            &__checkbox-link {
                font-size: 12px;
            }
        }
    }
}

@include media-query($xs) {
    ::v-deep {
        .footer {
            &__form {
                min-width: 335px;
                min-height: 305px;
                padding: 16px;
            }
        }
    }
    .box-footer::v-deep {
        .form {
            &__box:nth-child(1),
            &__box:nth-child(2) {
                width: 144px;
                height: 33px;
            }
            &__box:nth-child(3),
            &__box:nth-child(4) {
                width: 144px;
                height: 33px;
            }
            &__box {
                & input,
                input::placeholder {
                    font-size: 12px;
                }
            }
            & textarea,
            textarea::placeholder {
                font-size: 12px;
            }
            &__error-text {
                font-size: 9px;
                top: 35px;
            }
            &__input-other {
                .form__box {
                    width: 100%;
                    height: auto;
                }
            }
            &__checkbox-label {
                font-size: 9px;
            }
            &__checkbox-link {
                font-size: 9px;
            }
        }
    }
}
</style>
