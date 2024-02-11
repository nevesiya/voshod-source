<template>
    <footer class="footer">
        <div class="footer__contact">
            <lazy-load-container>
                <img class="footer__bg" :src="footerBackground" alt="footer background" />
            </lazy-load-container>
            <div class="footer__wrapper">
                <h2 class="footer__title">Контакты</h2>
                <div class="footer__info">
                    <div class="footer__info-box">
                        <template v-for="(item, index) in footerInfo" :key="index">
                            <h6 class="footer__info-title">{{ item.title }}</h6>
                            <ul class="footer__info-list">
                                <li
                                    class="footer__info-item"
                                    v-for="(text, index) in item.text"
                                    :key="index"
                                >
                                    <template v-if="item.title === 'телефон'">
                                        <a class="footer__info-tel" :href="'tel:' + text">{{
                                            text
                                        }}</a>
                                    </template>
                                    <template v-else>{{ text }}</template>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <div class="footer__info-social">
                        <a class="footer__social-link" href="https://vk.com" target="_blank"> </a>
                        <a class="footer__social-link" href="https://telegram.org" target="_blank">
                        </a>
                    </div>
                    <BaseFooterSimple class="footer__info-other" />
                </div>
            </div>
        </div>
        <div class="footer__map" id="map">
            <lazy-load-container>
                <GMapMap
                    map-type-id="terrain"
                    ref="google"
                    :options="options"
                    :center="center"
                    :zoom="9"
                    :style="styleMap"
                >
                    <GMapCluster
                        :zoomOnClick="true"
                        :algorithm="algorithm"
                        :renderer="{ renderer: renderer }"
                    >
                        <GMapMarker
                            :icon="mapMark"
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center = m.position"
                        />
                    </GMapCluster>
                </GMapMap>
            </lazy-load-container>
            <img
                @click="showForm = !showForm"
                :src="iconActionForm"
                :class="{ 'footer__form-toggle--active': showForm }"
                class="footer__form-toggle"
                alt="icon dialog"
            />
            <div class="footer__form-wrapper" :class="{ 'footer__form-wrapper--active': showForm }">
                <BaseForm
                    @sucSendForm="showFormSuccess = true"
                    v-if="!showFormSuccess"
                    :showCheckbox="showCheckbox"
                    class="footer__form"
                    theme-button="button--color-red button--size-m"
                    name-button="Отправить"
                />
                <transition name="fade">
                    <template v-if="showFormSuccess">
                        <div class="footer__form">
                            <div class="footer__form-body">
                                <div class="footer__body-wrapper">
                                    <h6 class="footer__form-title">Спасибо за обращение</h6>
                                    <p class="footer__form-text">
                                        Наш специалист с вами свяжется.<br />
                                        Пожалуйста, ожидайте.
                                    </p>
                                </div>
                                <button
                                    @click="showFormSuccess = false"
                                    class="footer__form-button button button--color-red button--size-m"
                                >
                                    Вернуться
                                </button>
                            </div>
                        </div>
                    </template>
                </transition>
            </div>
        </div>
    </footer>
</template>

<script>
import footerBackground from "@/assets/images/footer-background.jpg"
import mapMark from "@/assets/images/icon-map-mark.png"
import iconDialod from "@/assets/images/icon-dialog.svg"
import iconCross from "@/assets/images/icon-cross.svg"

import BaseForm from "@/components/UI/Form/BaseForm.vue"
import BaseFooterSimple from "@/components/BaseFooterSimple.vue"

import { GridAlgorithm } from "@googlemaps/markerclusterer"

export default {
    name: "TheFooter",
    components: { BaseFooterSimple, BaseForm },
    props: {
        styleMap: {
            default: {
                width: 100 + "%",
                height: 100 + "%"
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        mapMark: mapMark
    },
    data() {
        return {
            footerBackground,
            algorithm: new GridAlgorithm({}),
            footerInfo: {
                address: {
                    title: "адрес",
                    text: ["Санкт - Петербург", "ул. Сочинская", "д. 2А"]
                },
                workTime: {
                    title: "время работы",
                    text: ["пн-сб с 9.00 – 21.00", "вс - выходной"]
                },
                phone: {
                    title: "телефон",
                    text: [`+7 (812) 317-68-15`]
                }
            },
            center: {
                lat: 59.99098567258648,
                lng: 30.336393168862145
            },
            markers: [
                {
                    position: {
                        lat: 59.99098567258648,
                        lng: 30.336393168862145
                    }
                }
            ],
            options: {
                styles: [
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#e9e9e9"
                            },
                            {
                                lightness: 17
                            }
                        ]
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 17
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 29
                            },
                            {
                                weight: 0.2
                            }
                        ]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 18
                            }
                        ]
                    },
                    {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#dedede"
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                visibility: "on"
                            },
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                saturation: 36
                            },
                            {
                                color: "#333333"
                            },
                            {
                                lightness: 40
                            }
                        ]
                    },
                    {
                        elementType: "labels.icon",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f2f2f2"
                            },
                            {
                                lightness: 19
                            }
                        ]
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#fefefe"
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                color: "#fefefe"
                            },
                            {
                                lightness: 17
                            },
                            {
                                weight: 1.2
                            }
                        ]
                    }
                ]
            },
            showFormSuccess: false,
            showForm: false,
            google: null
        }
    },
    methods: {
        renderer: ({ count, position }) =>
            new this.google.maps.Marker({
                label: {
                    text: String(count),
                    color: "white",
                    fontSize: "10px"
                },
                position,
                // adjust zIndex to be above other markers
                zIndex: Number(this.google.maps.Marker.MAX_ZINDEX) + count
            })
    },
    computed: {
        iconActionForm() {
            return this.showForm ? iconCross : iconDialod
        }
    }
}
</script>

<style scoped lang="scss">
.vue-map-container {
    width: 100%;
    height: 100%;
}
.footer {
    display: flex;
    justify-content: center;
    margin: 0 auto;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-content: flex-end;
        flex-wrap: wrap;
        padding: 160px 60px 20px 16px;
    }

    &__bg {
        position: absolute;
        object-fit: cover;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    &__contact {
        position: relative;
        flex: 0 0 40%;

        & * {
            color: $white;
        }
    }

    &__info-box {
        margin-bottom: 80px;
    }

    &__title {
        @include font(500, 60px, 73px);
        letter-spacing: 0.02em;
        text-transform: uppercase;
        margin-bottom: 80px;

        &::after {
            content: "";
            display: block;
            margin-top: 15px;
            @include line(500px, 6px);
        }
    }

    &__info-title {
        @include font(600, 24px, 32px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        &::before {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 20px;
        }

        &:nth-child(1)::before {
            content: "";
            background: url(@/assets/images/icon-mark.svg);
            background-repeat: no-repeat;
        }

        &:nth-child(3)::before {
            content: "";
            background: url(@/assets/images/icon-clock.svg);
            background-repeat: no-repeat;
        }

        &:nth-child(5)::before {
            content: "";
            background: url(@/assets/images/icon-phone-white.svg);
            background-repeat: no-repeat;
        }
    }

    &__info {
    }

    &__info-list {
        margin: 0 0 40px 44px;
    }

    &__info-item {
        @include font(400, 16px, 19px);
        margin-bottom: 10px;
    }

    &__info-social {
        margin-bottom: 144px;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__social-link {
        border: 2px solid $white;
        filter: drop-shadow(0px 0px 11.1367px rgba(0, 0, 0, 0.3));
        border-radius: 100px;

        &:nth-child(1) {
            background: url(@/assets/images/logo-vk.svg);
            background-repeat: no-repeat;
            background-position: center center;
            width: 44px;
            height: 44px;
            padding: 13px 7px 7px 7px;
        }

        &:nth-child(2) {
            background: url(@/assets/images/logo-telegram.svg);
            background-repeat: no-repeat;
            background-position: 8px 10px;
            width: 44px;
            height: 44px;
            padding: 11px 11px 9px 8px;
        }
    }

    &__map {
        position: relative;
        box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1) inset;
        overflow-x: hidden;
        flex: 0 0 60%;
        & .lazy-load {
            width: 100%;
            height: 100%;
        }
    }

    &__form-toggle {
        display: none;
        padding: 13px;
        background: #ff1f00;
        border-radius: 8px;
        position: absolute;
        left: 16px;
        bottom: 16px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        transition: background 0.2s ease-in-out;
        &:hover {
            cursor: pointer;
        }
    }
    &__form-toggle--active {
        padding: 14px;
        background: $black;
    }

    &__form {
        width: 580px;
        height: 394px;
        padding: 29px 40px;
        position: absolute;
        left: 40px;
        bottom: 40px;
        background: $white;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    &__form-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding-top: 50px;
    }

    &__form-wrapper {
    }
    &__form-title {
        @include font(600, 30px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $black;
        margin-bottom: 20px;
    }
    &__form-text {
        @include font(500, 16px, 19px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $gray-dark;
        &::after {
            content: "";
            @include line(60px, 6px, $red-dark);
            display: block;
            margin-top: 15px;
        }
    }
    &__form-button {
        align-self: flex-start;
    }
}

::v-deep {
    .footer-simple {
        justify-content: flex-start;
        &__copyright {
            margin-right: 52px;
        }
        &__offer {
            margin-right: 23px;
        }
    }
}

::v-deep {
    .form {
        &__input-text {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        &__box {
            width: 242px;
        }
        &__box input {
            width: 100%;
        }
        &__text {
            width: 100%;
            height: 130px;
        }
    }
}

@include media-query($xxl) {
    // .footer {
    //     flex-wrap: wrap;
    //     &__contact {
    //         flex-basis: 100%;
    //     }
    //     &__map {
    //         flex-basis: 100%;
    //     }
    // }
}

@include media-query($xxl) {
    .footer {
        &__contact {
            flex-basis: 50%;
        }
        &__map {
            flex-basis: 50%;
        }
        &__wrapper {
            padding: 100px 16px 20px;
            align-content: center;
        }
        &__form {
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
        }
    }
}

@include media-query($xl) {
    .footer {
        flex-wrap: wrap;
        &__contact {
            flex-basis: 100%;
        }
        &__map {
            flex-basis: 100%;
            & .lazy-load {
                height: 800px;
            }
        }

        &__form {
            left: 50%;
            transform: translateX(-50%);
            bottom: 76px;
        }

        &__form-toggle {
            display: block;
        }
        &__form-wrapper {
            position: relative;
            opacity: 0;
            z-index: -99;
            transition: all 0.25s ease-in-out;
        }
        &__form-wrapper--active {
            opacity: 1;
            z-index: 99;
        }
    }
}

@include media-query($md) {
    .footer {
        &__wrapper {
        }
        &__title {
            font-size: 36px;
            line-height: normal;
            margin-bottom: 60px;
            &::after {
                margin-top: 30px;
                width: 400px;
            }
        }
        &__info-title {
            font-size: 20px;
        }
        &__info-item,
        &__info-tel {
            font-size: 14px;
        }
        &__info-box {
            margin-bottom: 60px;
        }
        &__info-social {
            margin-bottom: 114px;
        }
        &__form {
            width: 465px;
            height: 350px;
            padding: 25px 25px;
        }
        &__form-title {
            font-size: 26px;
        }
        &__form-text {
            font-size: 14px;
        }
        &__form-button {
            align-self: auto;
        }
    }

    ::v-deep {
        .form {
            &__box {
                width: 200px;
            }
            &__text {
                height: 101px;
                align-self: auto;
            }
            &__submit {
                align-self: auto;
            }
        }
    }

    ::v-deep {
        .footer-simple {
            gap: 20px;
            flex-wrap: wrap;
            & * {
                flex: 1 0 auto;
            }
            &__copyright {
                margin-right: 0px;
            }
            &__offer {
                margin-right: 0px;
            }
        }
    }
}

@include media-query($xs) {
    .footer {
        &__wrapper {
            padding-top: 50px;
            align-content: flex-start;
        }
        &__title {
            @include font(600, 24px);
            margin-bottom: 40px;
            width: 100%;
            &::after {
                width: 100%;
                height: 3px;
                margin-top: 10px;
            }
        }
        &__info-title {
            font-size: 16px;
            margin-bottom: 8px;
            @for $i from 1 through 5 {
                &:nth-child(#{$i})::before {
                    transform: scale(0.7);
                    margin-right: 10px;
                }
            }
        }
        &__info-list {
            margin: 0 0 32px 35px;
        }
        &__info-item {
            margin-bottom: 8px;
        }
        &__info-social {
            gap: 0px;
            margin-bottom: 60px;
        }
        &__social-link {
            transform: scale(0.6);
        }
        &__form {
            width: 335px;
            height: 290px;
            padding: 16px;
        }
        &__form-body {
            padding-top: 20px;
        }
        &__form-title {
            font-size: 20px;
            margin-bottom: 15px;
        }
        &__form-text {
            font-size: 12px;
            &::after {
                height: 4px;
                margin-top: 10px;
            }
        }
    }

    ::v-deep {
        .footer-simple {
            &__offer {
                display: none;
            }
            &__privacy-police {
                display: none;
            }
            &__copyright {
                font-size: 10px;
            }
        }
    }

    ::v-deep {
        .form {
            &__box {
                width: 144px;
                height: 33px;
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
        }
    }
}
</style>
