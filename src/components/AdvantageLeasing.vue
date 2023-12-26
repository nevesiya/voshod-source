<template>
    <div class="features">
        <div class="features__item" v-for="(item, index) in advantage" :key="index">
            <div class="features__img-box">
                <img class="features__img" :src="item.src" :alt="item.alt" />
            </div>
            <dl class="features__list">
                <dt class="features__term">
                    {{ item.term }}
                </dt>
                <dl class="features__definition">
                    {{ item.definition }}
                </dl>
            </dl>
        </div>
    </div>
</template>

<script>
import iconSimply from '@/assets/images/about-simply.svg'
import iconProfit from '@/assets/images/about-profit.svg'
import iconAvailable from '@/assets/images/about-available.svg'
import iconQuick from '@/assets/images/about-quick.svg'

export default {
    name: 'AdvantageLeasing',
    data() {
        return {
            advantage: [
                {
                    src: iconSimply,
                    alt: 'simply icon',
                    term: 'просто',
                    definition:
                        'Не требуется одобрение на автокредит или потребительский кредит в банке'
                },
                {
                    src: iconProfit,
                    alt: 'profit icon',
                    term: 'выгодно',
                    definition:
                        'Приобретая автомобиль в лизинг, вы не увеличиваете свою кредитную нагрузку и можете использовать кредитные продукты банков'
                },
                {
                    src: iconAvailable,
                    alt: 'available icon',
                    term: 'Доступно',
                    definition: 'Лизинг позволяет приобрести автомобиль более высокого класса'
                },
                {
                    src: iconQuick,
                    alt: 'quick icon',
                    term: 'быстро',
                    definition: 'Скорость и удобство проведения сделки в максимально короткие сроки'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.features {
    &__item {
        display: flex;
        align-items: center;
    }

    &__img-box {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
        background: $white;
        margin-right: 30px;
        border-radius: 100px;
    }

    &__img {
        min-width: 84px;
        min-height: 84px;
        object-fit: none;
    }

    &__term {
        @include font(600, 24px, normal);
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin-bottom: 15px;
    }

    &__definition {
        @include font(500, 16px, 140%);
        letter-spacing: 0.01em;
    }
}
</style>
