import BookCard from '../components/BookCard'
import Navbar from '../components/Navbar'

import { useLocalStorage } from '../context/localStorage'

function Bookshelf() {
  const { localBooks } = useLocalStorage()

  return (
    <main className='flex min-h-screen bg-slate-700 text-white'>
      <Navbar />

      <section className='mx-auto flex max-h-screen max-w-5xl flex-1 flex-col gap-4'>
        <h1 className='mt-8 text-center text-3xl font-bold'>My Library</h1>

        <section className='grid gap-4 overflow-auto p-4 sm:p-8'>
          {localBooks.length === 0 && (
            <p className='text-center'>
              You don&apos;t have any books in your library.
            </p>
          )}

          {localBooks.map((item, index) => (
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
      </section>
    </main>
  )
}

export default Bookshelf