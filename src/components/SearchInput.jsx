import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchInput({ handleSubmit, query, setQuery }) {
  return (
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
  )
}
