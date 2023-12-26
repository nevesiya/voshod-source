<template>
    <div class="box-footer">
        <BaseFooter :styleMap="styleMap" :showCheckbox="true" />
    </div>
</template>

<script>
import BaseFooter from '@/components/BaseFooter.vue'

export default {
    components: {
        BaseFooter
    },
    data() {
        return {
            styleMap: {
                width: 100 + '%',
                height: 1080 + 'px'
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.footer {
    display: block;
}

::v-deep {
    .footer {
        &__bg {
            display: none;
        }

        &__contact {
            background: none;
            & * {
                color: $black;
            }
        }
        &__form {
            position: absolute;
            left: 980px;
            top: 130px;
            bottom: 0px;
            min-width: 680px;
            min-height: 589px;
            padding: 80px 100px 60px;
            border-radius: 2px;
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
        }
        &__info-social {
            margin-bottom: 154px;
        }
        &__info-other {
            display: none;
        }
        &__info-title {
            &:nth-child(1)::before {
                content: '';
                background: url(@/assets/images/icon-mark-black.svg);
                background-repeat: no-repeat;
            }
            &:nth-child(3)::before {
                content: '';
                background: url(@/assets/images/icon-clock-black.svg);
                background-repeat: no-repeat;
            }
            &:nth-child(5)::before {
                content: '';
                background: url(@/assets/images/icon-phone-black.svg);
                background-repeat: no-repeat;
            }
        }
        &__map {
            width: 100%;
            position: static;
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
        &__title {
            margin: 50px 0 45px;
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
            // height: 42px;
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
</style>
