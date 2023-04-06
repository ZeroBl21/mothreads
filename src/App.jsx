import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Bookshelf from './pages/Bookshelf'
import NotFound from './pages/NotFound'
import BookDetails from './pages/BookDetails'

function App() {
  const basename = process.env.NODE_ENV === 'production' ? 'mothreads' : '/'

  return (
    <Router basename={basename}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookshelf' element={<Bookshelf />} />
        <Route path='/bookshelf/:bookId' element={<BookDetails />} />
        <Route path='/favorites' element={<Bookshelf />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
