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
            <BaseForm
                @sucSendForm="showFormSuccsess = true"
                v-if="!showFormSuccsess"
                :showCheckbox="showCheckbox"
                class="footer__form"
                theme-button="button--color-red button--size-m"
                name-button="Отправить"
            />
            <transition name="fade">
                <template v-if="showFormSuccsess">
                    <div class="footer__form">
                        <div class="footer__form-body">
                            <h6 class="footer__form-title">Спасибо за обращение</h6>
                            <p class="footer__form-text">
                                Наш специалист с вами свяжется. Пожалуйста, ожидайте.
                            </p>
                            <button
                                @click="showFormSuccsess = false"
                                class="footer__form-button button button--color-red button--size-m"
                            >
                                Вернуться
                            </button>
                        </div>
                    </div>
                </template>
            </transition>
        </div>
    </footer>
</template>

<script>
import footerBackground from '@/assets/images/footer-background.jpg'
import mapMark from '@/assets/images/icon-map-mark.png'

import BaseForm from '@/components/UI/Form/BaseForm.vue'
import BaseFooterSimple from '@/components/BaseFooterSimple.vue'

import { GridAlgorithm } from '@googlemaps/markerclusterer'

export default {
    name: 'TheFooter',
    components: { BaseFooterSimple, BaseForm },
    props: {
        styleMap: {
            default: {
                width: 1100 + 'px',
                height: 1000 + 'px'
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
                    title: 'адрес',
                    text: ['Санкт - Петербург', 'ул. Сочинская', 'д. 2А']
                },
                workTime: {
                    title: 'время работы',
                    text: ['пн-сб с 9.00 – 21.00', 'вс - выходной']
                },
                phone: {
                    title: 'телефон',
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
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#e9e9e9'
                            },
                            {
                                lightness: 17
                            }
                        ]
                    },
                    {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#f5f5f5'
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.fill',
                        stylers: [
                            {
                                color: '#ffffff'
                            },
                            {
                                lightness: 17
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#ffffff'
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
                        featureType: 'road.arterial',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#ffffff'
                            },
                            {
                                lightness: 18
                            }
                        ]
                    },
                    {
                        featureType: 'road.local',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#ffffff'
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#f5f5f5'
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#dedede'
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        elementType: 'labels.text.stroke',
                        stylers: [
                            {
                                visibility: 'on'
                            },
                            {
                                color: '#ffffff'
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                saturation: 36
                            },
                            {
                                color: '#333333'
                            },
                            {
                                lightness: 40
                            }
                        ]
                    },
                    {
                        elementType: 'labels.icon',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#f2f2f2'
                            },
                            {
                                lightness: 19
                            }
                        ]
                    },
                    {
                        featureType: 'administrative',
                        elementType: 'geometry.fill',
                        stylers: [
                            {
                                color: '#fefefe'
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: 'administrative',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#fefefe'
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
            showFormSuccsess: false,
            google: null
        }
    },
    methods: {
        renderer: ({ count, position }) =>
            new this.google.maps.Marker({
                label: {
                    text: String(count),
                    color: 'white',
                    fontSize: '10px'
                },
                position,
                // adjust zIndex to be above other markers
                zIndex: Number(this.google.maps.Marker.MAX_ZINDEX) + count
            })
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.footer {
    display: flex;
    justify-content: center;
    margin: 0 auto;

    &__wrapper {
        padding-left: 260px;
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
        width: 820px;

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
        margin: 160px 0 80px;

        &::after {
            content: '';
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
            content: '';
            background: url(@/assets/images/icon-mark.svg);
            background-repeat: no-repeat;
        }

        &:nth-child(3)::before {
            content: '';
            background: url(@/assets/images/icon-clock.svg);
            background-repeat: no-repeat;
        }

        &:nth-child(5)::before {
            content: '';
            background: url(@/assets/images/icon-phone.svg);
            background-repeat: no-repeat;
        }
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
    }
    &__form {
        width: 580px;
        height: 394px;
        padding: 29px 40px;
        position: absolute;
        left: 40px;
        bottom: 40px;
        background: $white;
        // display: flex;
        // flex-wrap: wrap;
        // gap: 15px;
    }

    &__form-body {
        margin-top: 100px;
        display: flex;
        flex-direction: column;
    }
    &__form-title {
        @include font(600, 30px, 140%);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $black;
        margin-bottom: 15px;
    }
    &__form-text {
        @include font(500, 16px, 19px);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: $gray-dark;
        margin-bottom: 50px;
        &::after {
            content: '';
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
</style>
