import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import api from '../api'

import BookCard from '../components/BookCard'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import { useLocalStorageState } from '../lib/hooks'

function Home() {
  const [query, setQuery] = useState('')
  const [startIndex, setStartIndex] = useState(0)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setLocalBooks] = useLocalStorageState('|_REACT_BOOKS_|', [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!query) return

    setLoading(true)
    const books = await api.books.search(query, startIndex)
    setLoading(false)
    setBooks(books)
  }

  const handleLoadMore = async () => {
    const newStartIndex = startIndex + 10
    setStartIndex(newStartIndex)

    setLoading(true)
    const newBooks = await api.books.search(query, newStartIndex)
    setLoading(false)
    setBooks((prev) => prev.concat(newBooks))
  }

  return (
    <main className='flex min-h-screen bg-slate-700 text-white'>
      <Navbar />

      <section className='mx-auto flex max-h-screen max-w-5xl flex-1 flex-col gap-4'>
        <form role='search' aria-label='Search' onSubmit={handleSubmit}>
          <label htmlFor='search' className='sr-only'>
            Search books
          </label>
          <div className='relative mx-4 mt-4'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <AiOutlineSearch className='h-5 w-5 text-gray-400' />
            </span>
            <input
              id='search'
              type='search'
              placeholder='Search book name, author, edition...'
              className='w-full rounded-full border border-gray-300 bg-transparent py-2 pl-8 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
            />
          </div>
        </form>

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
              setLocal={setLocalBooks}
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
      </section>
    </main>
  )
}

export default Home
