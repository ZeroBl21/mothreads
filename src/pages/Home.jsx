import { useState } from 'react'

import BookCard from '../components/BookCard'
import Spinner from '../components/Spinner'
import SearchInput from '../components/SearchInput'
import BaseLayout from './BaseLayout'
import api from '../api'

function Home() {
  const [query, setQuery] = useState('')
  const [startIndex, setStartIndex] = useState(0)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!query) return

    setLoading(true)
    const books = await api.books.list(query, startIndex)
    setLoading(false)
    setBooks(books)
  }

  const handleLoadMore = async () => {
    const newStartIndex = startIndex + 10
    setStartIndex(newStartIndex)

    setLoading(true)
    const newBooks = await api.books.list(query, newStartIndex)
    setLoading(false)
    setBooks((prev) => [...prev, ...newBooks])
  }

  return (
    <BaseLayout>
      <SearchInput
        handleSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
      />

      <section className='grid gap-4 overflow-auto p-4 sm:p-8'>
        {books.map((item, index) => (
          <BookCard
            key={`${item.id}-${index}`}
            id={item.id}
            title={item.title}
            authors={item.authors}
            thumbnail={item.thumbnail}
            publisher={item.publisher}
            description={item.description}
            favorite={item?.isFavorite}
          />
        ))}

        {loading && <Spinner />}

        {books.length > 0 && !loading && (
          <footer className='my-8 flex justify-center'>
            <button
              className='mx-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </footer>
        )}
      </section>
    </BaseLayout>
  )
}

export default Home
