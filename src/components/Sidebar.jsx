import { Link, useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const role = localStorage.getItem('role')
  const username = localStorage.getItem('username')

  function handleLogout() {
    // remove the saved login data and go back to login page
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    navigate('/')
  }

  // classes shared by all links
  const linkStyle = 'block px-3 py-2 rounded-md text-sm mb-1 '

  return (
    <div className="w-56 min-h-screen bg-emerald-900 text-emerald-100 p-4">
      <h1 className="text-xl font-bold text-white mb-4">Library</h1>

      {/* greeting with the logged in user */}
      {username && (
        <div className="bg-emerald-800 rounded-md px-3 py-2 mb-6">
          <p className="text-sm text-white">Hi, {username}</p>
          <p className="text-xs text-emerald-200">{role}</p>
        </div>
      )}

      <Link
        to="/books"
        className={linkStyle + (location.pathname === '/books' ? 'bg-emerald-300 text-emerald-900 font-medium' : 'hover:bg-emerald-800')}
      >
        Books
      </Link>

      <Link
        to="/my-borrows"
        className={linkStyle + (location.pathname === '/my-borrows' ? 'bg-emerald-300 text-emerald-900 font-medium' : 'hover:bg-emerald-800')}
      >
        My Borrows
      </Link>

      {(role === 'ADMIN' || role === 'LIBRARIAN') && (
        <Link
          to="/add-book"
          className={linkStyle + (location.pathname === '/add-book' ? 'bg-emerald-300 text-emerald-900 font-medium' : 'hover:bg-emerald-800')}
        >
          Add Book
        </Link>
      )}

      {role === 'ADMIN' && (
        <Link
          to="/members"
          className={linkStyle + (location.pathname === '/members' ? 'bg-emerald-300 text-emerald-900 font-medium' : 'hover:bg-emerald-800')}
        >
          Members
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 w-full text-left px-3 py-2 rounded-md text-sm hover:bg-emerald-800"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar