import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {
  FiBookmark,
  FiChevronDown,
  FiChevronUp,
  FiShare2
} from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import bookPlaceholderSvg from '../assets/book-placeholder.svg'
import BaseLayout from './BaseLayout'

import api, { loadingBook } from '../api'

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
  const [isDescriptionHidden, setDescriptionHidden] = useState(true)

  function toggleDescription() {
    setDescriptionHidden((prev) => !prev)
  }

  useEffect(() => {
    api.books.find(bookId).then(setBook)
  }, [bookId])

  return (
    <BaseLayout>
      <article className='p-4 sm:py-8'>
        <section className='flex flex-col justify-around sm:flex-row'>
          <figure className='relative grid place-items-center sm:top-6 sm:block'>
            <img
              src={thumbnail || bookPlaceholderSvg}
              className='aspect-[9/16] w-32 max-w-[8rem] shadow-md shadow-gray-600 sm:w-48 sm:max-w-[14rem]'
            />
          </figure>
          <div className='grid place-content-center gap-4 text-center sm:gap-8 sm:text-left'>
            <h1 className='pt-4 text-3xl'>{title}</h1>
            <p className='italic'>{authors?.join(' | ')}</p>
          </div>
        </section>
        <div className='rounded bg-gray-800 p-8'>
          <div className='flex items-center justify-end gap-8 border-b border-slate-700 pb-4'>
            <button
              className='grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-lg text-white'
              onClick={() => {}}
            >
              <FiShare2 />
            </button>
            <button
              className='grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-lg text-white'
              onClick={() => {}}
            >
              <FiBookmark className='fill-white' />
            </button>
            <button
              className='grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-lg text-white'
              onClick={() => {}}
            >
              <AiOutlineClose />
            </button>
          </div>
          <section className='grid min-h-[500px] gap-4 sm:grid-cols-3'>
            <div className='grid content-around gap-4 sm:col-span-2 sm:px-4'>
              <div>
                <h2 className='py-4 text-lg font-bold'>Description</h2>
                <p
                  className={`${
                    isDescriptionHidden ? 'line-clamp-[10]' : ''
                  } text-gray-300`}
                  dangerouslySetInnerHTML={{
                    __html: description
                  }}
                ></p>
                <button
                  className='ml-auto grid h-10 w-10 place-items-center rounded-full text-lg text-white'
                  onClick={toggleDescription}
                >
                  {isDescriptionHidden ? <FiChevronDown /> : <FiChevronUp />}
                </button>
              </div>

              <div>
                <h2 className='py-2 text-lg font-bold'>Categories</h2>
                <p>{categories}</p>
              </div>
            </div>
            <aside className='grid content-around gap-4'>
              <div>
                <h2 className='py-2 text-lg font-bold'>Publisher / Date</h2>
                <p>
                  {publisher} | {publishedDate}
                </p>
              </div>

              <div>
                <h2 className='py-2 text-lg font-bold'>Dimensions</h2>
                <i>
                  {dimensions
                    ? `${dimensions?.width} x ${dimensions?.thickness} x 
                  ${dimensions?.height}`
                    : 'Unknown'}
                </i>
              </div>

              <div>
                <h2 className='py-2 text-lg font-bold'>Pages</h2>
                <p>{pages}</p>
              </div>
            </aside>
          </section>
        </div>
      </article>
    </BaseLayout>
  )
}
