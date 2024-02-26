<template>
    <TheLoaderLocal v-if="loading" />
    <form
        v-else
        @submit.prevent="submit"
        novalidate
        action="#"
        class="form"
        ref="form"
    >
        <div class="form__input-text">
            <div class="form__box">
                <input
                    v-model="firstName"
                    placeholder="Имя"
                    type="text"
                    class="form__first-name"
                    :class="{
                        form__error: v$.firstName.$error,
                    }"
                />
                <span v-if="v$.firstName.$error" class="form__error-text">
                    {{ v$.firstName.$errors[0].$message }}
                </span>
            </div>
            <div class="form__box">
                <input
                    v-model="lastName"
                    placeholder="Фамилия"
                    type="text"
                    class="form__last-name"
                    :class="{
                        form__error: v$.lastName.$error,
                    }"
                />
                <span v-if="v$.lastName.$error" class="form__error-text">
                    {{ v$.lastName.$errors[0].$message }}
                </span>
            </div>
            <div class="form__box">
                <input
                    placeholder="+ 7 000 000 00 00"
                    type="tel"
                    class="form__tel form__tel--under"
                    v-imask="maskOff"
                    v-model="tel"
                    disabled
                    minlength="17"
                />
                <input
                    type="tel"
                    class="form__tel form__tel--above"
                    :class="{
                        form__error: v$.tel.$error,
                    }"
                    minlength="17"
                    v-model="tel"
                    v-imask="mask"
                    @accept="onAccept"
                    @complete="onComplete"
                />
                <span v-if="v$.tel.$error" class="form__error-text">
                    {{ v$.tel.$errors[0].$message }}
                </span>
            </div>
            <template v-if="showEmail">
                <div class="form__box">
                    <input
                        v-model="email"
                        placeholder="E-mail"
                        type="email"
                        class="form__mail"
                        :class="{
                            form__error: v$.email.$error,
                        }"
                    />
                    <span v-if="v$.email.$error" class="form__error-text">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
            </template>
            <template v-if="showComment">
                <textarea
                    @input="resizeTextarea($event)"
                    placeholder="Комментарий"
                    name="text"
                    class="form__text"
                ></textarea>
            </template>
        </div>
        <div class="form__input-other">
            <button
                type="submit"
                class="form__submit button"
                :class="themeButton"
            >
                {{ nameButton }}
            </button>
            <template v-if="showCheckbox">
                <div class="form__box">
                    <input
                        class="form__checkbox"
                        type="checkbox"
                        :id="idCheckbox"
                        v-model="toggle"
                        true-value="true"
                        false-value="false"
                        :class="{
                            'form__checkbox-error': this.notChecked,
                        }"
                    />
                    <label
                        class="form__checkbox-label"
                        :for="idCheckbox"
                        :class="{
                            'form__checkbox-error': this.notChecked,
                        }"
                    >
                        Я соглашаюсь с
                        <router-link
                            to="/privacy-police"
                            class="form__checkbox-link"
                            :class="{
                                'form__checkbox-error': this.notChecked,
                            }"
                        >
                            Условиями обработки персональных данных
                        </router-link>
                    </label>
                </div>
            </template>
        </div>
    </form>
</template>

<script>
import { IMaskDirective } from 'vue-imask';
import { useVuelidate } from '@vuelidate/core';
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from '@vuelidate/validators';
import TheLoaderLocal from '@/components/UI/Loader/TheLoaderLocal.vue';
// import axios from 'axios';

const alpha2 = helpers.regex(/^([а-яёА-ЯЁa-zA-Z\s]+)$/);

export default {
    name: 'BaseForm',
    directives: {
        imask: IMaskDirective,
    },
    components: {
        TheLoaderLocal,
    },
    props: {
        showComment: {
            type: Boolean,
            default: true,
        },
        showEmail: {
            type: Boolean,
            default: true,
        },
        showCheckbox: {
            type: Boolean,
            default: true,
        },
        themeButton: {
            type: String,
        },
        nameButton: {
            type: String,
        },
    },
    emits: ['sucSendForm'],
    data() {
        return {
            v$: useVuelidate(),
            formData: {},
            firstName: '',
            lastName: '',
            tel: '',
            email: '',
            toggle: '',
            notChecked: '',
            errorText: {
                required: 'Пожалуйста, заполните поле',
                alpha2: 'Поле может содержать только буквы',
                minLength: 'Пожалуйста, укажите полный номер',
                maxLength: 'Не более 30 символов',
                email: 'Пожалуйста, укажите верную почту',
            },
            mask: {
                mask: '{+ 7} 000 000 00 00',
                lazy: true,
                placeholderChar: ' ',
            },
            maskOff: {
                mask: '{+ 7} 000 000 00 00',
                lazy: false,
                placeholderChar: '0',
            },
            loading: false,
            idCheckbox: '',
        };
    },
    watch: {
        toggle() {
            if (this.toggle == 'true') {
                this.notChecked = false;
            }
        },
    },
    methods: {
        getIdCheckbox() {
            const attrs = this.$refs.form.attributes;

            for (let i = 0; i < attrs.length; i++) {
                if (attrs[i].name.startsWith('data-v')) {
                    this.idCheckbox += ' ' + attrs[i].name;
                }
            }
        },
        // onAccept(e) {
        //     const maskRef = e.detail;
        //     this.tel = maskRef.value;
        //     console.log('accept', maskRef.value);
        // },
        // onComplete(e) {
        //     const maskRef = e.detail;
        //     console.log('complete', maskRef.unmaskedValue);
        // },
        submit() {
            this.v$.$validate();

            if (this.toggle == '' || this.toggle == 'false') {
                this.notChecked = true;
            } else if (this.toggle == 'true') {
                this.notChecked = false;
            }

            if (
                !this.v$.firstName.$error &&
                !this.v$.lastName.$error &&
                !this.v$.tel.$error &&
                (this.v$.email.$error || this.showEmail) &&
                (!this.notChecked || !this.showCheckbox)
            ) {
                this.formData.first_name = this.firstName;
                this.formData.last_name = this.lastName;
                this.formData.email = this.email;
                this.formData.tel = this.tel;
                this.loading = true;

                setTimeout(() => {
                    this.loading = false;
                    this.$emit('sucSendForm');
                }, 1000);
                // this.post();
            }
        },

        // async post() {
        // this.loading = true;

        //     axios
        //         .post(
        //             'https://my.api.mockaroo.com/form.json?key=a84cf050&__method=POST',
        //             this.formData
        //         )
        //         .then((response) => {
        //             console.log('Ответ от сервера:', response.data);
        //         })
        //         .catch((error) => {
        //             console.error('Ошибка при отправке формы:', error);
        //         });

        // this.loading = false;
        // },

        resizeTextarea() {
            // let textarea = e.target;
            // let targetHeight = '130px';
            // let targetHeightParse = parseInt(targetHeight);
            // let computedStyleParse = parseInt(
            //     getComputedStyle(textarea).height
            // );
            // if (computedStyleParse > targetHeightParse) {
            //     return;
            // } else {
            //     textarea.style.height = 'auto';
            //     textarea.style.height = textarea.scrollHeight + 'px';
            // }
        },
    },
    validations() {
        return {
            firstName: {
                required: helpers.withMessage(
                    this.errorText.required,
                    required,
                ),
                alpha2: helpers.withMessage(this.errorText.alpha2, alpha2),
                maxLength: helpers.withMessage(
                    this.errorText.maxLength,
                    maxLength(30),
                ),
            },
            lastName: {
                required: helpers.withMessage(
                    this.errorText.required,
                    required,
                ),
                alpha2: helpers.withMessage(this.errorText.alpha2, alpha2),
                maxLength: helpers.withMessage(
                    this.errorText.maxLength,
                    maxLength(30),
                ),
            },
            tel: {
                required: helpers.withMessage(
                    this.errorText.required,
                    required,
                ),
                minLength: helpers.withMessage(
                    this.errorText.minLength,
                    minLength(17),
                ),
            },
            email: {
                required: helpers.withMessage(
                    this.errorText.required,
                    required,
                ),
                email: helpers.withMessage(this.errorText.email, email),
            },
        };
    },
    mounted() {
        this.getIdCheckbox();
    },
};
</script>

<style scoped lang="scss">
.form {
    @include flex-between();
    flex-direction: column;
    flex-grow: 1;

    &__input-text,
    &__input-other {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &__submit {
        align-self: flex-start;
    }

    &__box {
        position: relative;
    }

    &__error {
        border-bottom: 2px solid $red-dark;
    }

    &__error-text {
        @include font(500, 12px, 140%);
        color: $red-dark;
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 45px;
    }

    &__text {
        overflow: auto;
        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-thumb {
            z-index: 99;
            background-color: $gray-light;
            border-radius: 3px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: $gray;
        }
    }

    &__tel--box {
        position: relative !important;
    }

    &__tel--above {
        position: absolute !important;
        left: 0;
    }

    &__tel--under {
        color: $gray !important;
    }

    &__checkbox {
        width: auto !important;
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    &__checkbox:checked + label::before {
        content: '';
        display: inline-block;
        background-image: url('@/assets/images/check.svg');
        background-position: center;
        background-repeat: no-repeat;
    }

    &__checkbox-label {
        display: flex;
        align-items: center;
        user-select: none;
        &::before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid $black;
            border-radius: 2px;
            margin-right: 10px;
        }
    }
    &__checkbox-label.form__checkbox-error {
        &::before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid $red-dark;
            border-radius: 2px;
            margin-right: 10px;
        }
    }
    &__checkbox-label,
    &__checkbox-link {
        font-family: Lato;
        @include font(500, 14px, 17px);
        letter-spacing: 0.01em;
        color: $black;
    }
    &__checkbox-link {
        text-decoration-line: underline !important;
        margin-left: 4px;
    }
    &__checkbox-error {
        color: $red-dark;
    }
}

input,
textarea {
    border-bottom: 2px solid $gray-light;
    padding: 9px 15px;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        @include font(400, 16px, 140%);
        color: $gray;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        border-bottom: 2px solid $black;
    }
}

input {
    width: 100%;
    height: 100%;
    &[type] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}

textarea {
    width: 100%;
    outline: none;
    resize: none;
    overflow: hidden;

    &[name] {
        @include font(400, 16px, 140%);
        color: $black;
    }
}
</style>
