import { useState, useEffect } from 'react'
import { API_URL } from '../config'

function Books() {
  const [books, setBooks] = useState([])
  const [message, setMessage] = useState('')
  const [searchText, setSearchText] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiNote, setAiNote] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const role = localStorage.getItem('role')

  // runs one time when the page opens
  useEffect(() => {
    loadBooks()
  }, [])

  async function loadBooks() {
    const token = localStorage.getItem('token')

    try {
      // get all books from backend
      const response = await fetch(API_URL + '/book/all', {
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
      const response = await fetch(API_URL + '/book/search?title=' + searchText, {
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
      const response = await fetch(API_URL + '/borrow/' + bookId, {
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

  async function removeBook(bookId) {
    // ask once more before deleting
    if (!window.confirm('Remove this book from the library?')) {
      return
    }

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(API_URL + '/book/delete/' + bookId, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })

      const data = await response.json()
      setMessage(data.message)

      // load again so the removed book disappears
      loadBooks()
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  // ask the AI to find books for what the student typed
  async function askAi() {
    if (aiQuestion.trim() === '') {
      return
    }

    const token = localStorage.getItem('token')
    setAiLoading(true)
    setAiNote('')

    try {
      const response = await fetch(API_URL + '/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ question: aiQuestion })
      })

      const data = await response.json()

      if (response.ok) {
        setBooks(data.books)
        if (data.usedAi) {
          setAiNote('AI found ' + data.books.length + ' book(s) for you')
        } else {
          setAiNote(data.note)
        }
      } else {
        setAiNote(data.message)
      }
    } catch (error) {
      setAiNote('Could not connect to server')
    }

    setAiLoading(false)
  }

  // clear the boxes and show every book again
  function showAllBooks() {
    setAiQuestion('')
    setAiNote('')
    setSearchText('')
    setMessage('')
    loadBooks()
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
        {/* AI search */}
        <div className="bg-white border border-teal-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-teal-800 mb-2">Ask AI to find a book</p>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              type="text"
              placeholder="e.g. a book to start learning web development"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
            />
            <button
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md"
              onClick={askAi}
              disabled={aiLoading}
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
          {aiNote && <p className="text-sm text-gray-600 mt-2">{aiNote}</p>}
          <button
            className="text-sm underline text-teal-700 mt-2"
            onClick={showAllBooks}
          >
            Show all books
          </button>
        </div>

        {/* normal search box */}
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

                {/* members can borrow */}
                {role === 'MEMBER' && (
                  <button
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md mt-4"
                    onClick={() => borrowBook(book.book_id)}
                  >
                    Borrow
                  </button>
                )}

                {/* only admin can remove */}
                {role === 'ADMIN' && (
                  <button
                    className="w-full border border-red-600 text-red-700 hover:bg-red-50 py-2 rounded-md mt-4"
                    onClick={() => removeBook(book.book_id)}
                  >
                    Remove book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Books