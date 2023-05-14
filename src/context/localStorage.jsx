import { createContext, useContext } from 'react'
import { useLocalStorageState } from '../lib/hooks'

const LocalStorageContext = createContext()

export function LocalStorageProvider({ children }) {
  const [localBooks, setLocalBooks] = useLocalStorageState(
    '|_REACT_BOOKS_|',
    []
  )

  function addComment(id, comment) {
    const updatedBooks = localBooks.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          comment
        }
      }
      return book
    })

    setLocalBooks(updatedBooks)
  }

  return (
    <LocalStorageContext.Provider value={{ localBooks, setLocalBooks, addComment }}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function useLocalStorage() {
  const context = useContext(LocalStorageContext)

  if (context === undefined) {
    throw new Error('useLocalStorage must be used within a AuthProvider')
  }

  return context
}
