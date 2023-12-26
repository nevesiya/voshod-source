<template>
  <base-accordion v-for="item in splitQestions(startSlice, endSlice)" :key="item.question">
    <template #header>{{ item.question }}</template>
    <template #body>
      <template v-if="!Array.isArray(item.answer)">{{ item.answer }}</template>
      <template v-else>
        <ul class="list-answer">
          <li v-for="item in item.answer" :key="item" class="item-answer">
            {{ item }}
          </li>
        </ul>
      </template>
    </template>
  </base-accordion>
</template>

<script>
import BaseAccordion from '@/components/UI/Accordion/BaseAccordion.vue'

export default {
  name: 'BaseQuestion',
  components: { BaseAccordion },
  props: {
    questions: {
      type: Array
    },
    startSlice: {
      type: Number
    },
    endSlice: {
      type: Number
    }
  },
  data() {
    return {}
  },
  methods: {
    splitQestions(start, end) {
      return this.questions.slice(start, end)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

:deep(.accordion-body) {
  display: block;
  @include font(500, 16px, 140%);
  letter-spacing: 0.16px;
}

:deep(.accordion-header) {
  @include flex-between;
  @include font(500, 20px, 140%);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
  letter-spacing: 0.2px;
  text-align: start;
  border-bottom: 2px solid #f2f3f6;
  &::after {
    content: '';
    background: url(@/assets/images/arrow-right-small-white.svg), $black;
    filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.15));
    background-repeat: no-repeat;
    transform: rotate(90deg);
    background-position: center center;
    border-radius: 50%;
    display: block;
    min-width: 24px;
    min-height: 24px;
    margin-left: 20px;
    margin-top: 3px;
    transition: all ease-in-out 0.25s;
  }
}
:deep(.accordion-header--open) {
  &::after {
    content: '';
    background: url(@/assets/images/arrow-right-small-white.svg), $red-dark;
    background-repeat: no-repeat;
    transform: rotate(-90deg);
    background-position: center center;
  }
}
:deep(.accordion-item) {
  width: 620px;
}
</style>
