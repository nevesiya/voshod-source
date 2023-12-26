import helpers from '@/helpers/global'
import BaseFooterSimple from '@/components/BaseFooterSimple.vue'
import BasePagination from '@/components/UI/Pagination/BasePagination.vue'
import ModalBooking from '@/components/UI/Modal/ModalBooking.vue'
import FilterRange from '@/components/FilterRange.vue'
import FilterCheckbox from '@/components/FilterCheckbox.vue'
import FilterButton from '@/components/FilterButton.vue'
import BaseBanner from '@/components/BaseBanner.vue'
import FilterCheckboxModels from '@/components/FilterCheckboxModels.vue'

import cardImage from '@/assets/images/card-image.jpg'

export default {
    components: {
        ModalBooking,
        BaseFooterSimple,
        FilterRange,
        FilterCheckbox,
        FilterButton,
        BaseBanner,
        FilterCheckboxModels,
        BasePagination
    },
    data() {
        return {
            showModal: false,
            cardImage: cardImage
        }
    },
    props: {
        product: {
            type: Object
        }
    },
    emits: ['selectedCar'],
    methods: {
        selectCar(brand, model) {
            this.$emit('selectedCar', brand + ' ' + model)
        },

        getClass(item) {
            return helpers.checkLabelProduct(item)
        }
    },
    computed: {
        modelName() {
            return helpers.removeBrandReplay(this.product.model, this.product.brand)
        }
    }
}
