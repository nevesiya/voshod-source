import axios from 'axios'

export async function fetchData(url, reserveUrl = null) {
    try {
        const response = await axios.get(url)

        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error(error)

        if (reserveUrl) {
            return await fetchData(reserveUrl)
        }

        throw error
    }
}
