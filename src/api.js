import bookPlaceholderSvg from './assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  authors: ['loading...'],
  thumbnail: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  description: 'Loading...',
  loadingBook: true
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook
}))

const api = {
  books: {
    search: async (query, startIndex = 0, maxResults = 10) => {
      try {
        const rawData = await (
          await fetch(
            `${
              import.meta.env.VITE_SEARCH_URL
            }${query}&startIndex=${startIndex}&maxResults=${maxResults}`
          )
        ).json()

        const data = rawData?.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo?.authors,
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
          publisher: item.volumeInfo.publisher,
          description: item.volumeInfo?.description
        }))

        return data ?? loadingBooks
      } catch (e) {
        console.error(e)
        return []
      }
    }
  }
}

export default api
