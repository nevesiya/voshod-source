<template>
  <BaseNavigation v-if="showNavigation" />
  <router-view></router-view>
  <ScrollTopPage />
  <TheCoockies />
</template>

<script>
import ScrollTopPage from '@/components/ScrollTopPage.vue'
import BaseNavigation from '@/components/BaseNavigation.vue'
import TheCoockies from '@/components/TheCoockies.vue'

export default {
  name: 'App',
  components: {
    ScrollTopPage,
    BaseNavigation,
    TheCoockies
  },
  data() {
    return {
      path: ['/privacy-police', '/']
    }
  },
  computed: {
    showNavigation() {
      return !this.path.includes(this.$route.path)
    }
  }
}
</script>

<style>
@import '@/assets/styles/theme.scss';
</style>
