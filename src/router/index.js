import { createRouter, createWebHashHistory } from 'vue-router'
import { useSavedScrollPosition } from '@/stores/ScrollPositionStore'

const router = createRouter({
    base: '/voshod/', // gh-pages
    history: createWebHashHistory(), // gh-pages
    scrollBehavior(to, from, savedPosition) {
        const isPageProduct = !!to.params.id || !!from.params.id
        const isPageCuurent = from.name === undefined

        if (isPageProduct || isPageCuurent) {
            const savedPositionStore = useSavedScrollPosition()
            savedPositionStore.currentScrollPosition = savedPosition.top

            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => import('@/views/HomeView.vue')
        },
        {
            name: 'Catalog',
            path: '/catalog',
            component: () => import('@/views/CatalogView.vue')
        },
        {
            name: 'DetailsProduct',
            path: '/catalog/:id',
            component: () => import('@/views/DetailsProductView.vue')
        },
        {
            name: 'Contacts',
            path: '/contacts',
            component: () => import('@/views/ContactsView.vue')
        },
        {
            name: 'Programs',
            path: '/programs',
            component: () => import('@/views/ProgramsView.vue')
        },
        {
            name: 'Questions',
            path: '/questions',
            component: () => import('@/views/QuestionsView.vue')
        },
        {
            name: 'Rent',
            path: '/rent/:id?',
            component: () => import('@/views/RentView.vue')
        },
        {
            name: 'PrivacyPolice',
            path: '/privacy-police',
            component: () => import('@/views/PrivacyPoliceView.vue')
        },
        {
            name: 'NotFound',
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/NotFoundView.vue')
        },
        {
            path: '/404',
            component: () => import('@/views/NotFoundView.vue')
        }
    ]
})

export default router
