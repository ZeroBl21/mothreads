import {
  FiBook,
  FiHome,
  FiSearch,
  FiBookmark,
  FiSettings
} from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../components/Logo'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav
      className='
        fixed flex h-[100dvh] w-14
        flex-col items-center justify-between
        bg-gray-800
        py-8
        text-gray-300
      '
    >
      <div>
        <Link to='/' title='Home'>
          <Logo className='fill-sky-300' aria-label='Moth' />
        </Link>
      </div>
      <ul className='flex flex-wrap justify-center gap-12'>
        <li>
          <Link className='hover:brightness-125' to='/' title='Home'>
            <FiHome
              size={24}
              aria-label='Home'
              className={` ${location.pathname === '/' && 'stroke-sky-300'}`}
            />
          </Link>
        </li>
        <li>
          <Link className='hover:brightness-125' to='/search' title='Search'>
            <FiSearch
              size={24}
              aria-label='Search'
              className={` ${
                location.pathname === '/search' && 'stroke-sky-300'
              }`}
            />
          </Link>
        </li>
        <li>
          <Link className='hover:brightness-125' to='/bookshelf' title='Books'>
            <FiBook
              size={24}
              aria-label='Books'
              className={` ${
                location.pathname === '/bookshelf' && 'stroke-sky-300'
              }`}
            />
          </Link>
        </li>
        <li>
          <Link
            className='hover:brightness-125'
            to='/favorites'
            title='Favorites'
          >
            <FiBookmark
              size={24}
              aria-label='Favorites'
              className={` ${
                location.pathname === '/favorites' && 'stroke-sky-300'
              }`}
            />
          </Link>
        </li>
      </ul>
      <div>
        <Link className='hover:brightness-125' to='/settings' title='Settings'>
          <FiSettings
            size={24}
            aria-label='Settings'
            className={` ${
              location.pathname === '/settings' && 'stroke-sky-300'
            }`}
          />
        </Link>
      </div>
    </nav>
  )
}
