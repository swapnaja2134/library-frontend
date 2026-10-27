import { useState } from 'react'
import { API_URL } from '../config'

function AddBook() {
  const [book, setBook] = useState({
    title: '', author: '', isbn: '', category: '', totalCopies: ''
  })
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(API_URL + '/book/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          category: book.category,
          totalCopies: Number(book.totalCopies),
          // a new book starts with all copies available
          availableCopies: Number(book.totalCopies)
        })
      })

      if (response.ok) {
        setMessage('Book added')
        setBook({ title: '', author: '', isbn: '', category: '', totalCopies: '' })
      } else {
        const data = await response.json()
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  const inputStyle = 'w-full bg-white border border-emerald-200 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-600'

  return (
    <div>
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Add a book</h2>
      </div>

      <div className="p-6 max-w-md">
        <form onSubmit={handleSubmit}>
          <input className={inputStyle} name="title" placeholder="Title" value={book.title} onChange={handleChange} />
          <input className={inputStyle} name="author" placeholder="Author" value={book.author} onChange={handleChange} />
          <input className={inputStyle} name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
          <input className={inputStyle} name="category" placeholder="Category" value={book.category} onChange={handleChange} />
          <input className={inputStyle} name="totalCopies" type="number" placeholder="Number of copies" value={book.totalCopies} onChange={handleChange} />
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md" type="submit">
            Add book
          </button>
        </form>

        {message && (
          <p className="bg-teal-100 text-teal-800 text-sm px-3 py-2 rounded-md mt-4">{message}</p>
        )}
      </div>
    </div>
  )
}

export default AddBook