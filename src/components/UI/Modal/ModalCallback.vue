<template>
    <base-modal
        @close-modal="this.$emit('closeModal')"
        :title="modalData.title"
        :text="modalData.text"
        :showBtnBack="!isFormSubmitted"
    >
        <template v-if="!isFormSubmitted" #form>
            <BaseForm
                @sucSendForm="isFormSubmitted = true"
                class="modal-content__form"
                :showEmail="false"
                theme-button="button--color-black button--size-s"
                name-button="перезвоните мне"
            />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '@/components/UI/Modal/BaseModal.vue';
import BaseForm from '@/components/UI/Form/BaseForm.vue';

export default {
    name: 'ModalCallback',
    components: { BaseModal, BaseForm },
    emits: ['closeModal'],
    data() {
        return {
            isFormSubmitted: false,
            dataBeforeSubmittedForm: {
                title: 'заказать звонок',
                text: 'Оставьте свой номер телефона и мы перезвоним вам в ближайшее время',
            },
            dataAfterSubmittedForm: {
                title: 'Спасибо за обращение',
                text: 'Наш специалист с вами свяжется. Пожалуйста, ожидайте.',
            },
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

<style lang="scss" scoped></style>
