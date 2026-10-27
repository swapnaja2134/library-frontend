import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function Register() {
  const [form, setForm] = useState({
    name: '', username: '', email: '', password: '', phone: '', address: ''
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // one function for all the input boxes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    try {
      const response = await fetch(API_URL + '/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        // account created, go to login page
        navigate('/')
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  const inputStyle = 'w-full bg-white border border-emerald-200 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-600'

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-emerald-900">Create account</h2>
        <p className="text-sm text-gray-600 mb-6">Join the library as a member</p>

        <form onSubmit={handleSubmit}>
          <input className={inputStyle} name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
          <input className={inputStyle} name="username" placeholder="Username" value={form.username} onChange={handleChange} />
          <input className={inputStyle} name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className={inputStyle} name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={handleChange} />
          <input className={inputStyle} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input className={inputStyle} name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md" type="submit">
            Register
          </button>
        </form>

        <p className="text-red-600 text-sm mt-3">{message}</p>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/" className="text-teal-700 underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register