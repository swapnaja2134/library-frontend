import { useState, useEffect } from 'react'

function MyBorrows() {
  const [borrows, setBorrows] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadBorrows()
  }, [])

  async function loadBorrows() {
    const token = localStorage.getItem('token')

    try {
      // get the books borrowed by the logged in member
      const response = await fetch('http://localhost:8081/borrow/my', {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      if (response.ok) {
        const data = await response.json()
        setBorrows(data)
      } else {
        setMessage('Please login first')
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  async function returnBook(borrowId) {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:8081/borrow/return/' + borrowId, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token }
      })

      const data = await response.json()
      setMessage(data.message)

      // load again so the status changes on screen
      loadBorrows()
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  return (
    <div>
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">My borrowed books</h2>
      </div>

      <div className="p-6">
        {message && (
          <p className="bg-teal-100 text-teal-800 text-sm px-3 py-2 rounded-md mb-4">{message}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {borrows.map((borrow) => (
            <div key={borrow.id} className="bg-white border border-emerald-200 rounded-lg overflow-hidden">
              <div className={'h-2 ' + (borrow.status === 'BORROWED' ? 'bg-emerald-300' : 'bg-teal-200')}></div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{borrow.book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Borrowed on {borrow.borrowDate}</p>

                {borrow.status === 'BORROWED' ? (
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
                      Due {borrow.dueDate}
                    </span>
                    <button
                      className="w-full border border-teal-700 text-teal-800 hover:bg-teal-50 py-2 rounded-md mt-4"
                      onClick={() => returnBook(borrow.id)}
                    >
                      Return
                    </button>
                  </div>
                ) : (
                  <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
                    Returned
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBorrows