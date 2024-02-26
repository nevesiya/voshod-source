<template>
    <BaseModal
        @close-modal="this.$emit('closeModal')"
        :title="modalData.title"
        :title-minor="modalData.titleMinor"
        :text="modalData.text"
        :show-btn-back="!isFormSubmitted"
    >
        <template v-if="!isFormSubmitted" #form>
            <BaseForm
                @suc-send-form="isFormSubmitted = true"
                class="modal-content__form"
                :show-email="false"
                :show-comment="false"
                theme-button="button--color-black button--size-s"
                name-button="перезвоните мне"
            />
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from '@/components/UI/Modal/BaseModal.vue';
import BaseForm from '@/components/UI/Form/BaseForm.vue';

export default {
    name: 'ModalBooking',
    components: { BaseModal, BaseForm },
    props: {
        nameCar: {
            type: String,
        },
    },
    emits: ['closeModal'],
    data() {
        return {
            dataBeforeSubmittedForm: {
                title: 'Бронирование',
                titleMinor: this.nameCar,
                text: 'Оставьте свой номер телефона для регистрации бронирования',
            },
            dataAfterSubmittedForm: {
                title: 'Спасибо за обращение',
                text: 'Наш специалист с вами свяжется. Пожалуйста, ожидайте.',
            },
            isFormSubmitted: false,
        };
    },
    computed: {
        modalData() {
            return this.isFormSubmitted
                ? this.dataAfterSubmittedForm
                : this.dataBeforeSubmittedForm;
        },
    },
};
</script>

<style lang="scss" scoped>
:deep(.form) {
    & input {
        width: 100%;
    }
    & textarea {
        width: 100%;
        height: 42px;
    }
}
</style>
