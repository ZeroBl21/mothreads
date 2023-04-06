import bookPlaceholderSvg from './assets/book-placeholder.svg'

export const loadingBook = {
  title: 'Loading...',
  authors: ['loading...'],
  thumbnail: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  publishedDate: 'Loading...',
  description: 'Loading...',
  categories: 'Loading...',
  pages: 'Loading...',
  dimensions: {
    width: 'Loading...',
    height: 'Loading...',
    depth: 'Loading...'
  },
  loadingBook: true
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook
}))

const searchUrl = import.meta.env.VITE_SEARCH_URL
const baseUrl = import.meta.env.VITE_BASE_URL

const api = {
  books: {
    async list(query, startIndex = 0, maxResults = 10) {
      try {
        const response = await fetch(
          `${searchUrl}${query}&startIndex=${startIndex}&maxResults=${maxResults}`
        )
        const rawData = await response.json()
        const data = rawData?.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo?.authors ?? [],
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo?.publishedDate ?? 'Unknown',
          thumbnail:
            item.volumeInfo?.imageLinks?.thumbnail ?? bookPlaceholderSvg,
          description:
            item.volumeInfo?.description ?? 'No description available.',
          categories: item.volumeInfo?.categories ?? 'Unknown',
          pages: item.volumeInfo?.pageCount ?? 'Unknown',
          dimensions: item.volumeInfo?.dimensions
        }))
        return data ?? loadingBooks
      } catch (error) {
        console.error(error)
        return []
      }
    },

    async find(id) {
      try {
        const response = await fetch(`${baseUrl}/${id}`)
        const rawData = await response.json()
        const data = {
          id: rawData.id,
          title: rawData.volumeInfo.title,
          authors: rawData.volumeInfo?.authors ?? [],
          publisher: rawData.volumeInfo.publisher,
          publishedDate: rawData.volumeInfo?.publishedDate ?? 'Unknown',
          thumbnail:
            rawData.volumeInfo?.imageLinks?.thumbnail ?? bookPlaceholderSvg,
          description:
            rawData.volumeInfo?.description ?? 'No description available.',
          categories: rawData.volumeInfo?.categories ?? 'Unknown',
          pages: rawData.volumeInfo?.pageCount ?? 'Unknown',
          dimensions: rawData.volumeInfo?.dimensions
        }

        return data ?? loadingBook
      } catch (error) {
        console.error(error)
        return []
      }
    }
  }
}

export default api
