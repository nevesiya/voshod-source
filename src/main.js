import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import { IMaskComponent } from 'vue-imask'
import VueGoogleMaps from 'vue-google-maps-community-fork'
import { LazyLoadImageDirective } from './directives/LazyLoadImageDirective'

import TheLoader from './components/UI/Loader/TheLoader.vue'
import TheLoaderLocal from './components/UI/Loader/TheLoaderLocal.vue'
import LazyLoadContainer from './components/LazyLoadContainer.vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/theme.scss'

const app = createApp(App)

app.directive('lazy-img', LazyLoadImageDirective)

app.component('TheLoader', TheLoader)
app.component('TheLoaderLocal', TheLoaderLocal)
app.component('LazyLoadContainer', LazyLoadContainer)

const KEY = import.meta.env.DEV
    ? 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'
    : 'AIzaSyDYtpTq5yxnSbzzNNIXs401pBDnsNjOpqU'

app.use(VueGoogleMaps, {
    load: {
        key: KEY
    }
})
    .use(IMaskComponent)
    .use(router)
    .use(createPinia())
    .mount('#app')
