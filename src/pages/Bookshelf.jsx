import { useLocation } from 'react-router-dom'

import BookCard from '../components/BookCard'
import { useLocalStorage } from '../context/localStorage'
import BaseLayout from './BaseLayout'

function Bookshelf() {
  const { localBooks } = useLocalStorage()
  const location = useLocation()

  const favorites = location.pathname === '/favorites'
  let visibleBooks = localBooks

  if (favorites) {
    visibleBooks = localBooks.filter((book) => book.isFavorite)
  }

  return (
    <BaseLayout>
      <h1 className='mt-8 text-center text-3xl font-bold'>
        {!favorites ? 'Library' : 'Favorites'}
      </h1>

      <section className='grid gap-4 overflow-auto p-4 sm:p-8'>
        {visibleBooks.length === 0 && (
          <p className='text-center'>
            You don&apos;t have any books in your library.
          </p>
        )}

        {visibleBooks.map((item, index) => (
          <BookCard
            key={`${item.id}-${index}`}
            id={item.id}
            title={item.title}
            authors={item.authors}
            thumbnail={item.thumbnail}
            publisher={item.publisher}
            description={item.description}
            isFavorite={item?.isFavorite}
          />
        ))}
      </section>
    </BaseLayout>
  )
}

export default Bookshelf
