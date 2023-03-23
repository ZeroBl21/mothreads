import { AiOutlinePlus } from 'react-icons/ai'

import bookPlaceholderSvg from '../assets/book-placeholder.svg'

export default function BookCard({
  id,
  title,
  thumbnail = bookPlaceholderSvg,
  description,
  authors,
  publisher,
  setLocal
}) {
  function handleClick() {
    const newBook = {
      id,
      title,
      thumbnail,
      description,
      authors,
      publisher
    }

    setLocal((prev) => {
      const exist = prev?.find((i) => i.id === id)
      if (exist) return prev

      return [...prev, newBook]
    })
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
          <h2 className='text-xl font-semibold'>{title}</h2>
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

        <div className='absolute top-0 right-0 bottom-0 mr-4 flex items-center justify-end sm:mr-[-1rem]'>
          <button
            className='grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-lg text-white'
            onClick={handleClick}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </article>
  )
}
