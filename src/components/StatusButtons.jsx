import { AiOutlineClose } from 'react-icons/ai'
import { FiBookmark, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi'

import { useLocalStorage } from '../context/localStorage'

export default function StatusButtons({ book }) {
  const { localBooks, setLocalBooks } = useLocalStorage()
  // Checks if the book already exists in the local book list
  const matchingBook = localBooks?.find((li) => li.id === book.id) ?? null

  function addToLocalBooks() {
    if (matchingBook) return

    const newBook = {
      ...book,
      isFavorite: false
    }

    setLocalBooks((prev) => [...prev, newBook])
  }

  function deleteFromLocalBooks(id) {
    const newBooks = localBooks.filter((book) => book.id !== id)

    setLocalBooks(newBooks)
  }

  function toggleFavorite(id) {
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

  function toggleRead(id) {
    const updatedBooks = localBooks.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          isFinished: !book.isFinished
        }
      }
      return book
    })

    setLocalBooks(updatedBooks)
  }

  return (
    <>
      {matchingBook ? (
        <>
          <button
            className='grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125'
            onClick={() => toggleFavorite(book.id)}
          >
            <FiBookmark
              className={`${matchingBook.isFavorite ? 'fill-white' : ''}`}
            />
          </button>
          <button
            className='grid h-10 w-10 place-items-center rounded-full bg-gray-600 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125'
            onClick={() => toggleRead(book.id)}
          >
            {matchingBook?.isFinished ? <FiEyeOff/> : <FiEye />}
          </button>
          <button
            className='grid h-10 w-10 place-items-center rounded-full bg-red-600 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125'
            onClick={() => deleteFromLocalBooks(book.id)}
          >
            <AiOutlineClose />
          </button>
        </>
      ) : (
        <button
          className='grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125'
          onClick={addToLocalBooks}
        >
          <FiPlus />
        </button>
      )}
    </>
  )
}
