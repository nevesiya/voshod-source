import BaseFooterSimple from '@/components/BaseFooterSimple.vue'
import FilterRange from '@/components/FilterRange.vue'
import FilterCheckbox from '@/components/FilterCheckbox.vue'
import FilterButton from '@/components/FilterButton.vue'
import FilterCheckboxModels from '@/components/FilterCheckboxModels.vue'
import BasePagination from '@/components/UI/Pagination/BasePagination.vue'
import BaseBanner from '@/components/BaseBanner.vue'
import CardSkeleton from '@/components/UI/Skeleton/CardSkeleton.vue'
import BaseSkeleton from '@/components/UI/Skeleton/BaseSkeleton.vue'
import helpers from '@/helpers/global'

export default {
    components: {
        BaseFooterSimple,
        FilterRange,
        FilterCheckbox,
        FilterButton,
        FilterCheckboxModels,
        BasePagination,
        BaseBanner,
        CardSkeleton,
        BaseSkeleton
    },
    data() {
        return {
            product: [],
            model: [],
            brand: new Set(),
            condition: new Set(),
            body: new Set(),
            transmission: new Set(),
            drive: new Set(),
            fuel: new Set(),
            promo: new Set(),
            status: new Set(),
            service: new Set(),
            minPrice: 0,
            maxPrice: 0,
            minYear: 0,
            maxYear: 0,
            selectBrand: [],
            selectModel: [],
            selectCondition: [],
            selectStatus: [],
            selectService: [],
            selectPromo: [],
            selectBody: [],
            selectTransmission: [],
            selectDrive: [],
            selectFuel: [],
            selectMinPrice: '',
            selectMaxPrice: '',
            selectMinYear: '',
            selectMaxYear: '',
            reset: 0,
            pageStart: '',
            pageEnd: '',
            loading: false
        }
    },
    watch: {
        minPrice() {
            this.minPrice = Math.floor(this.minPrice / 100000) * 100000
        },
        maxPrice() {
            this.maxPrice = Math.ceil(this.maxPrice / 100000) * 100000
        },
        selectBrand() {
            if (this.selectBrand.length && this.selectModel.length) {
                this.model = helpers.getCarModels(this.product, this.selectBrand)
                return
            }

            if (!this.selectBrand.length) {
                this.model = helpers.getCarModels(this.product)
                return
            }

            this.model = helpers.getCarModels(this.filteringProduct)
        },
        selectModel() {
            if (this.selectModel.length && this.selectBrand.length) {
                let currentModel = this.model.map((el) => el.brand)
                this.brand = helpers.getUniqueElements(this.product, 'brand', true, currentModel)
                return
            }

            if (!this.selectModel.length && this.selectBrand.length) {
                this.brand = helpers.getUniqueElements(this.product, 'brand')
                return
            }

            if (!this.selectModel.length && !this.selectBrand.length) {
                this.model = helpers.getCarModels(this.product)
                this.brand = helpers.getUniqueElements(this.product, 'brand')
                return
            }

            this.brand = helpers.getUniqueElements(this.filteringProduct, 'brand')
        }
    },
    computed: {
        disabledResetButton() {
            return this.product.length === this.filteringProduct.length
        },
        filteringProduct() {
            return this.product
                .filter(
                    (product) =>
                        !this.selectBrand.length || this.selectBrand.includes(product.brand)
                )
                .filter(
                    (product) =>
                        !this.selectModel.length || this.selectModel.includes(product.model)
                )
                .filter(
                    (product) =>
                        !this.selectCondition.length ||
                        this.condition.size === this.selectCondition.length ||
                        this.selectCondition.includes(product.condition)
                )
                .filter(
                    (product) =>
                        !this.selectBody.length ||
                        this.body.size === this.selectBody.length ||
                        this.selectBody.includes(product.body)
                )
                .filter(
                    (product) =>
                        !this.selectTransmission.length ||
                        this.transmission.size === this.selectTransmission.length ||
                        this.selectTransmission.includes(product.transmission)
                )
                .filter(
                    (product) =>
                        !this.selectDrive.length ||
                        this.drive.size === this.selectDrive.length ||
                        this.selectDrive.includes(product.drive)
                )
                .filter(
                    (product) =>
                        !this.selectStatus.length ||
                        this.fuel.size === this.selectStatus.length ||
                        this.selectStatus.includes(product.status)
                )
                .filter(
                    (product) =>
                        !this.selectService.length ||
                        this.fuel.size === this.selectService.length ||
                        this.selectService.includes(product.service)
                )
                .filter(
                    (product) =>
                        !this.selectFuel.length ||
                        this.fuel.size === this.selectFuel.length ||
                        this.selectFuel.includes(product.fuel)
                )
                .filter(
                    (product) =>
                        !this.selectPromo.length ||
                        this.promo.size === this.selectPromo.length ||
                        this.selectPromo.filter((select) => {
                            product.promo ??= ''
                            return product.promo.includes(select)
                        }).length
                )
                .filter((product) => !this.selectMinPrice || product.price >= this.selectMinPrice)
                .filter((product) => !this.selectMaxPrice || product.price <= this.selectMaxPrice)
                .filter((product) => !this.selectMinYear || product.year >= this.selectMinYear)
                .filter((product) => !this.selectMaxYear || product.year <= this.selectMaxYear)
        }
    }
}
