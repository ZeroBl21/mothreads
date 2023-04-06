import { Link } from 'react-router-dom'

import StatusButtons from './StatusButtons'

export default function BookCard(book) {
  const { id, title, thumbnail, description, authors, publisher } = book

  return (
    <article
      className='relative rounded bg-gray-800 px-4 py-6 sm:grid'
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
            <Link className='hover:underline' to={`/bookshelf/${id}`}>
              {title}
            </Link>
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

        <div className='absolute bottom-0 right-0 top-0 mr-[-1rem] flex items-center justify-end'>
          <div className='flex flex-col items-center gap-8'>
            <StatusButtons book={book} />
          </div>
        </div>
      </div>
    </article>
  )
}
