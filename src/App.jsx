import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Books from './pages/Books'
import MyBorrows from './pages/MyBorrows'

function App() {
  const location = useLocation()
  // the sidebar should not show on the login page
  const isLoginPage = location.pathname === '/'

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/my-borrows" element={<MyBorrows />} />
        </Routes>
      </div>
    </div>
  )
}

export default App