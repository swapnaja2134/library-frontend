import { Link, useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    // remove the saved login data and go back to login page
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  // classes shared by both links
  const linkStyle = 'block px-3 py-2 rounded-md text-sm mb-1 '

  return (
    <div className="w-56 min-h-screen bg-emerald-900 text-emerald-100 p-4">
      <h1 className="text-xl font-bold text-white mb-6">Library</h1>

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