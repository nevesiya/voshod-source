export default {
    getUniqueElements(data, name, sort = true, only = []) {
        let allElements = data.flatMap((elem) => elem[name])
        let uniqueElements = new Set(allElements)
        uniqueElements = Array.from(uniqueElements).filter((item) => {
            // Boolean || only.length ? only.includes(item) : '';
            if (only.length) {
                return only.includes(item)
            } else {
                return item
            }

            // return false;
        })
        sort ? uniqueElements.sort() : uniqueElements
        return uniqueElements
    },

    findMinMaxDigits(data, name) {
        let min
        let max
        let allPoints = data.map((elem) => elem[name])

        if (allPoints.length) {
            min = allPoints.reduce((min, current) => Math.min(min, current))
            max = allPoints.reduce((max, current) => Math.max(max, current))
        }

        return [min, max]
    },

    getCarModels(product, only = []) {
        let obj = {}
        let arr = []

        // product.sort((a, b) => a.brand.localeCompare(b.brand));
        // product.forEach((item) => {
        //     const { brand, models } = item;
        //     const uniqueSortedModels = [
        //         ...new Set(models.map((modelItem) => modelItem.model)),
        //     ].sort();
        //     models.push({ brand, models: uniqueSortedModels });
        // });

        product.forEach((el) => {
            if (only.length && !only.includes(el.brand)) {
                return
            }

            if (!(obj[el.brand] instanceof Set)) {
                obj[el.brand] = new Set()
            }

            obj[el.brand].add(el.model)
        })

        for (const [key, value] of Object.entries(obj)) {
            arr.push({ brand: key, models: [...value].sort() })
        }

        arr.sort((a, b) => {
            if (a.brand > b.brand) {
                return 1
            }
            if (a.brand < b.brand) {
                return -1
            }
            return 0
        })

        return arr
    },

    getCarProducts(data) {
        return data.flatMap((item) => item.models.flat())
    },

    removeBrandReplay(model, brand) {
        model = model.split(' ')
        let temp = model.indexOf(brand)

        if (temp > -1) {
            model.splice(temp, 1)
        }

        return model.join(' ')
    },

    searchProduct(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] == value) {
                return array[i]
            } else if (i == array.length - 1) {
                return null
            }
        }
    },

    checkLabelProduct(label) {
        switch (label) {
            case 'Лизинг до 7 лет':
                return 'card__label--leasing'
            case 'Аванс 0%':
                return 'card__label--advance'
            case 'Гарантия 150 тыс. км':
                return 'card__label--guaranty'
            case 'Свободна':
                return 'card__label--free'
            case 'Занята':
                return 'card__label--busy'
        }
    },

    debounce(callback, delay) {
        let timer

        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                callback.apply(this, args)
            }, delay)
        }
    }
}
