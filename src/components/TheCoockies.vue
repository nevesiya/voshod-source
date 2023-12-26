<template>
  <template v-if="showPopup">
    <base-toast>
      <template #content>
        <img src="@/assets/images/icon-cookies.svg" alt="cookies icon" />
        <p class="cookies-box">
          <span class="cookies-box__title">Мы используем файлы-сookies</span
          ><span class="cookies-box__text"
            >Продолжая использовать этот сайт вы даёте своё согласие на работу с этими файлами</span
          >
        </p>
      </template>
      <template #close>
        <img
          @click="recordConsentCoockie"
          src="@/assets/images/close-circle.svg"
          alt="close circle"
        />
      </template>
    </base-toast>
  </template>
</template>

<script>
import BaseToast from '@/components/UI/Toast/BaseToast.vue'

export default {
  name: 'TheCoockies',
  components: { BaseToast },
  data() {
    return {
      showPopup: true
    }
  },
  methods: {
    recordConsentCoockie() {
      localStorage.setItem('cookieConsent', 'true')
    }
  },
  beforeMount() {
    if (localStorage.getItem('cookieConsent')) {
      this.showPopup = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';
// .toast {
//     display: flex;
//     position: fixed;
//     left: 50%;
//     bottom: 20px;
//     transform: translateX(-50%);
//     width: 398px;
//     padding: 10px 20px;
//     border-radius: 5px;
//     background: rgba(0, 0, 0, 0.5);
//     box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
//     backdrop-filter: blur(1px);
//     z-index: 99;
// }

.toast {
  display: flex;
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 398px;
  padding: 10px 20px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1px);
  z-index: 99;

  ::v-deep {
    .toast {
      &__content {
        display: flex;
        & img {
          align-self: center;
          margin-right: 20px;
        }
      }

      &__close {
        align-self: flex-start;
        cursor: pointer;
        & img {
          max-width: fit-content;
        }
      }
    }
  }
}

.cookies-box {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  &__title {
    @include font(500, 12px);
    color: $white;
    display: inline-block;
    margin-bottom: 5px;
  }
  &__text {
    @include font(inherit, 12px);
    color: $white;
    display: inline-block;
  }
}
</style>
