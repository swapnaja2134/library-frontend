import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    try {
      // send username and password to the backend
      const response = await fetch('http://localhost:8081/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      })

      const data = await response.json()

      if (response.ok) {
        // save the token so we can use it on other pages
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        navigate('/books')
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* left green panel, hidden on small screens */}
      <div className="hidden md:flex w-1/2 bg-emerald-800 relative overflow-hidden items-center p-12">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-700"></div>
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-emerald-500"></div>
        <div className="relative text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Find it.<br />Borrow it.<br />Return it.
          </h1>
          <p className="text-emerald-200 mt-3">Your college library, online</p>
        </div>
      </div>

      {/* right side with the login form */}
      <div className="flex-1 flex items-center justify-center bg-emerald-50 p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-emerald-900">Welcome back</h2>
          <p className="text-sm text-gray-600 mb-6">Login to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              className="w-full bg-white border border-emerald-200 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full bg-white border border-emerald-200 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="text-red-600 text-sm mt-3">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Login