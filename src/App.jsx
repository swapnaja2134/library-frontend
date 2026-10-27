import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Register from './pages/Register'
import Books from './pages/Books'
import MyBorrows from './pages/MyBorrows'
import AddBook from './pages/AddBook'
import Members from './pages/Members'

// if there is no token the user is sent back to login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return children
}

function App() {
  const location = useLocation()
  // sidebar should not show on login and register pages
  const hideSidebar = location.pathname === '/' || location.pathname === '/register'

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          <Route path="/my-borrows" element={<ProtectedRoute><MyBorrows /></ProtectedRoute>} />
          <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App