import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-gray-800'>
      <h1 className='text-9xl font-extrabold tracking-widest text-white'>
        404
      </h1>
      <div className='absolute rotate-12 rounded bg-yellow-500 px-2 text-sm'>
        Page Not Found
      </div>
      <button className='mt-5'>
        <Link
          to='/'
          className='group relative inline-block text-sm font-medium text-yellow-500 focus:outline-none focus:ring active:text-orange-500'
        >
          <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0'></span>

          <span className='relative block border border-current bg-gray-900 px-8 py-3'>
            Go Home
          </span>
        </Link>
      </button>
    </main>
  )
}
