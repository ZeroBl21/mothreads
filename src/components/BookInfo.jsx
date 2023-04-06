import { useState } from 'react'

import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function BookInfo({
  publisher,
  publishedDate,
  description,
  categories,
  pages,
  dimensions
}) {
  const [isDescriptionHidden, setDescriptionHidden] = useState(true)

  function toggleDescription() {
    setDescriptionHidden((prev) => !prev)
  }

  return (
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
  )
}
