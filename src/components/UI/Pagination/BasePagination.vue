<template>
    <div
        v-show="totalAmountData >= displayAmountData"
        class="pagination"
    >
        <div class="page-wrapper">
            <button
                v-show="showButtonPrevPages"
                @click="showPrevPages"
                class="button-arrow button-arrow--prev"
            >
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-ahead"
                />
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-ahead"
                />
            </button>
            <button
                v-show="this.currentPage"
                @click="(this.currentPage -= 1), paginatedData()"
                class="button-arrow button-arrow--back"
            >
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-back"
                />
            </button>
            <template
                v-for="page in pageCount.showPages"
                :key="page"
            >
                <button
                    @click="(this.currentPage = page - 1), paginatedData()"
                    class="button-page"
                    :class="{
                        'button-page--active': this.currentPage == page - 1,
                    }"
                >
                    {{ page }}
                </button>
            </template>
            <button
                v-show="this.currentPage != pageCount.totalPages.length - 1"
                @click="(this.currentPage += 1), paginatedData()"
                class="button-arrow button-arrow--ahead"
            >
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-ahead"
                />
            </button>
            <button
                v-show="showButtonNextPages"
                @click="showNextPages"
                class="button-arrow button-arrow--next"
            >
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-ahead"
                />
                <img
                    src="@/assets/images/arrow-right-small-black.svg"
                    alt="button-ahead"
                />
            </button>
            <button
                v-show="showButtonLast"
                @click="
                    (this.currentPage = pageCount.totalPages.length - 1),
                        paginatedData()
                "
                class="button-page button-page--last"
            >
                {{ pageCount.totalPages.length }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BasePagination',
    props: {
        totalAmountData: {
            type: Number,
        },
        displayAmountData: {
            type: Number,
            default: 15,
        },
    },
    emits: ['actualPage'],
    data() {
        return {
            currentPage: 0,
            quantityPagesDisplay: 3,
        };
    },
    watch: {
        totalAmountData() {
            this.currentPage = 0;
            this.updatePages();
        },
    },
    methods: {
        updatePages() {
            const start = this.currentPage * this.displayAmountData,
                end = start + this.displayAmountData;

            this.$emit('actualPage', { start, end });
        },
        paginatedData() {
            this.updatePages();
            scroll({
                top: 0,
                // behavior: 'smooth',
            });
        },
        showNextPages() {
            this.currentPage + this.quantityPagesDisplay >=
            this.pageCount.totalPages.length - 1
                ? (this.currentPage = this.pageCount.totalPages.length - 1)
                : (this.currentPage += this.quantityPagesDisplay);
            this.paginatedData();
        },
        showPrevPages() {
            this.currentPage - this.quantityPagesDisplay <= 0
                ? (this.currentPage = 0)
                : (this.currentPage -= this.quantityPagesDisplay);
            this.paginatedData();
        },
    },
    computed: {
        pageCount() {
            let l = this.totalAmountData,
                s = this.displayAmountData;
            let totalPages = [];

            for (let i = 1; i <= Math.ceil(l / s); i++) {
                totalPages.push(i);
            }

            let showPages = [];

            if (totalPages.length <= this.quantityPagesDisplay) {
                showPages = totalPages.slice();
            } else if (
                this.currentPage + this.quantityPagesDisplay >=
                totalPages.length
            ) {
                showPages = totalPages.slice(
                    totalPages.length - this.quantityPagesDisplay
                );
            } else {
                showPages = totalPages.slice(
                    this.currentPage,
                    this.currentPage + this.quantityPagesDisplay
                );
            }

            return { showPages, totalPages };
        },
        showButtonNextPages() {
            return !(
                this.currentPage + this.quantityPagesDisplay >=
                this.pageCount.totalPages.length - 1
            );
        },
        showButtonPrevPages() {
            return this.currentPage - this.quantityPagesDisplay >= 0;
        },
        showButtonLast() {
            return (
                this.currentPage <
                this.pageCount.totalPages.length - this.quantityPagesDisplay
            );
        },
    },
    mounted() {
        this.paginatedData();
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.button-page {
    width: 40px;
    height: 40px;
    border: 2px solid $black;
    border-radius: 2px;
    align-self: center;
    transition: all 0.2s ease-in-out;
    &:hover {
        border: 2px solid $red-dark;
        color: $red-dark;
    }
    &--active {
        background: $black;
        color: $white;
        &:hover {
            border: 2px solid $black;
            background: $black;
            color: $white;
            opacity: 0.7;
        }
    }
    &--last {
    }
}

.button-arrow {
    display: flex;
    align-self: center;
    padding: 3px 5px;
    & img {
        width: 15px;
        height: 15px;
    }
    &--back {
        margin-right: -10px;
        transform: rotateY(180deg);
    }
    &--ahead {
        margin-left: -10px;
    }
    &--next {
        margin-left: -10px;
        & img:last-child {
            margin-left: -8px;
        }
    }
    &--prev {
        margin-right: -10px;
        & img {
            transform: rotate(180deg);
        }
        & img:last-child {
            margin-left: -8px;
        }
    }
}

.pagination {
    display: flex;
    align-items: center;
}

.page-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}
</style>
