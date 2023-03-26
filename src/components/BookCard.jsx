import {
  AiOutlineClose,
} from 'react-icons/ai'
import { FiBookmark, FiPlus } from 'react-icons/fi'

import bookPlaceholderSvg from '../assets/book-placeholder.svg'
import { useLocalStorage } from '../context/localStorage'

export default function BookCard({
  id,
  title,
  thumbnail = bookPlaceholderSvg,
  description,
  authors,
  publisher,
  isFavorite = false
}) {
  const { localBooks, setLocalBooks } = useLocalStorage()

  const exist = localBooks?.find((li) => li.id === id) ?? null

  function handleAddClick() {
    if (exist) return

    const newBook = {
      id,
      title,
      thumbnail,
      description,
      authors,
      publisher,
      isFavorite: false
    }

    setLocalBooks((prev) => [...prev, newBook])
  }

  function handleDeleteClick(id) {
    const newBooks = localBooks.filter((book) => book.id !== id)

    setLocalBooks(newBooks)
  }

  function handleFavoriteClick(id) {
    const updatedBooks = localBooks.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          isFavorite: !book.isFavorite
        }
      }
      return book
    })

    setLocalBooks(updatedBooks)
  }

  return (
    <article
      className='relative rounded bg-gray-800 py-6 px-4 sm:grid'
      style={{ gridTemplateColumns: '1fr 3fr' }}
    >
      <figure className='m-4 grid place-items-center'>
        <img
          src={thumbnail}
          alt={`${title} book cover`}
          className='max-w-32 max-h-48 shadow-md shadow-gray-600'
        />
      </figure>

      <div className='px-4'>
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <h2 className='text-center text-xl font-semibold sm:text-left'>
            {title}
          </h2>
          <div className='grid text-center sm:text-right'>
            <span className='font-medium'>
              {authors ? authors.join(', ') : 'Desconocido'}
            </span>
            <span className='text-sm text-gray-400'>
              ({publisher || 'Desconocido'})
            </span>
          </div>
        </div>

        <p className='mt-4 hidden text-gray-300 sm:block'>
          {description ? description.slice(0, 500) : 'Sin Descripción'}
        </p>

        <div className='absolute top-0 right-0 bottom-0 flex items-center justify-end mr-[-1rem]'>
          {exist ? (
            <div className='flex flex-col items-center gap-8'>
              <button
                className='grid h-10 w-10 place-items-center rounded-full bg-red-600 text-lg text-white'
                onClick={() => handleDeleteClick(id)}
              >
                <AiOutlineClose />
              </button>
              <button
                className='grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-lg text-white'
                onClick={() => handleFavoriteClick(id)}
              >
                <FiBookmark className={`${isFavorite ? 'fill-white': ''}`}/>
              </button>
            </div>
          ) : (
            <button
              className='grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-lg text-white'
              onClick={handleAddClick}
            >
              <FiPlus />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
