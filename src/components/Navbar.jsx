import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  // this makes the navbar redraw every time the page changes
  const location = useLocation()

  const token = localStorage.getItem('token')

  function handleLogout() {
    // remove the saved login data and go back to login page
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <div className="navbar">
      <span className="brand">Library Management System</span>

      {token && (
        <div className="nav-links">
          <Link to="/books">Books</Link>
          <Link to="/my-borrows">My Borrows</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default Navbar