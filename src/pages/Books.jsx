import { useState, useEffect } from 'react'

function Books() {
  const [books, setBooks] = useState([])
  const [message, setMessage] = useState('')
  const [searchText, setSearchText] = useState('')

  // runs one time when the page opens
  useEffect(() => {
    loadBooks()
  }, [])

  async function loadBooks() {
    const token = localStorage.getItem('token')

    try {
      // get all books from backend
      const response = await fetch('http://localhost:8081/book/all', {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      } else {
        setMessage('Please login first')
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  async function searchBooks() {
    // if the box is empty show all books again
    if (searchText === '') {
      loadBooks()
      return
    }

    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:8081/book/search?title=' + searchText, {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      if (response.ok) {
        const data = await response.json()
        setBooks(data)
        setMessage('')
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  async function borrowBook(bookId) {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:8081/borrow/' + bookId, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      })

      const data = await response.json()
      setMessage(data.message)

      // load the books again so the available count updates
      loadBooks()
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  // colour of the strip on top of the card
  function getStripColor(book) {
    if (book.availableCopies === 0) {
      return 'bg-red-300'
    } else if (book.availableCopies <= 2) {
      return 'bg-amber-300'
    } else {
      return 'bg-emerald-300'
    }
  }

  // colour and text of the small badge
  function getBadge(book) {
    if (book.availableCopies === 0) {
      return { style: 'bg-red-100 text-red-800', text: 'Out of stock' }
    } else if (book.availableCopies <= 2) {
      return { style: 'bg-amber-100 text-amber-800', text: book.availableCopies + ' left' }
    } else {
      return { style: 'bg-emerald-100 text-emerald-800', text: book.availableCopies + ' available' }
    }
  }

  // add up all available copies for the chip in the header
  let totalAvailable = 0
  for (let i = 0; i < books.length; i++) {
    totalAvailable = totalAvailable + books[i].availableCopies
  }

  return (
    <div>
      {/* green header band */}
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Books</h2>
        <div className="flex gap-2 mt-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full">
            {books.length} books
          </span>
          <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
            {totalAvailable} copies in
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* search box */}
        <div className="flex gap-2 mb-4">
          <input
            className="bg-white border border-emerald-200 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-600"
            type="text"
            placeholder="Search by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md"
            onClick={searchBooks}
          >
            Search
          </button>
        </div>

        {message && (
          <p className="bg-teal-100 text-teal-800 text-sm px-3 py-2 rounded-md mb-4">{message}</p>
        )}

        {/* book cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.book_id} className="bg-white border border-emerald-200 rounded-lg overflow-hidden">
              <div className={'h-2 ' + getStripColor(book)}></div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-600 mb-3">{book.category}</p>
                <span className={'text-xs px-3 py-1 rounded-full ' + getBadge(book).style}>
                  {getBadge(book).text}
                </span>
                <button
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md mt-4"
                  onClick={() => borrowBook(book.book_id)}
                >
                  Borrow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Books