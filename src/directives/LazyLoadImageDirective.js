import { useSavedScrollPosition } from '@/stores/ScrollPositionStore'
import { nextTick } from 'vue'

export const LazyLoadImageDirective = {
    mounted(el, binding) {
        const isAbsolute = window.getComputedStyle(el).position === 'absolute'

        nextTick(() => {
            let isAbove

            if (isAbsolute) {
                const lowerBorderEl = el.getBoundingClientRect().bottom
                const savedPositionStore = useSavedScrollPosition()
                isAbove = savedPositionStore.currentScrollPosition > lowerBorderEl
            }

            if (isAbove) {
                el.src = binding.value
            } else {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                                el.src = binding.value
                                observer.disconnect()
                            }
                        })
                    },
                    { threshold: 0, rootMargin: '200px 0px' }
                )

                observer.observe(el)
            }
        })
    }
}
