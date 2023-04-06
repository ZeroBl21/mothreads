import { useEffect, useState } from 'react'
import { FiShare2 } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import BaseLayout from './BaseLayout'
import api, { loadingBook } from '../api'
import BookInfo from '../components/BookInfo'
import StatusButtons from '../components/StatusButtons'

export default function BookDetails() {
  const { bookId } = useParams()
  const [book, setBook] = useState(loadingBook)
  const {
    title,
    authors,
    thumbnail,
    publisher,
    publishedDate,
    description,
    categories,
    pages,
    dimensions
  } = book

  useEffect(() => {
    api.books.find(bookId).then(setBook)
  }, [bookId])

  function handleShare() {
    const url = window.location.href
    navigator.clipboard.writeText(url)
  }

  return (
    <BaseLayout>
      <article className='p-4 sm:py-8 '>
        <section className='grid-cols-3 sm:grid'>
          <figure className='relative grid place-items-center sm:top-6'>
            <img
              src={thumbnail}
              className='aspect-[9/16] w-32 max-w-[8rem] shadow-md shadow-gray-600 sm:w-48 sm:max-w-[14rem]'
            />
          </figure>
          <div className='col-span-2 grid content-center gap-4 text-center sm:gap-8 sm:text-left'>
            <h1 className='pt-4 text-3xl'>{title}</h1>
            <p className='italic'>{authors?.join(' | ')}</p>
          </div>
        </section>
        <div className='rounded bg-gray-800 p-8 outline outline-1 outline-slate-600'>
          <div className='flex items-center justify-end gap-8 border-b border-slate-700 pb-4'>
            <button
              className='grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-lg text-white transition ease-in hover:scale-110 hover:brightness-125'
              onClick={handleShare}
            >
              <FiShare2 />
            </button>
            <StatusButtons book={book} />
          </div>
          <BookInfo
            publisher={publisher}
            publishedDate={publishedDate}
            description={description}
            categories={categories}
            pages={pages}
            dimensions={dimensions}
          />
        </div>
      </article>
    </BaseLayout>
  )
}
