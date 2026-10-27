import { useState, useEffect } from 'react'
import { API_URL } from '../config'

function Members() {
  const [members, setMembers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadMembers()
  }, [])

  async function loadMembers() {
    const token = localStorage.getItem('token')

    try {
      // get all members, only admin is allowed to do this
      const response = await fetch(API_URL + '/admin/members', {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      } else {
        setMessage('Only the admin can see this page')
      }
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  async function resetPassword(member) {
    // ask the admin to type a temporary password
    const newPassword = window.prompt('Type a temporary password for ' + member.username + ' (at least 6 characters)')

    if (newPassword === null || newPassword === '') {
      return
    }

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(API_URL + '/admin/reset-password/' + member.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ newPassword: newPassword })
      })

      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Could not connect to server')
    }
  }

  return (
    <div>
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Members</h2>
      </div>

      <div className="p-6">
        {message && (
          <p className="bg-teal-100 text-teal-800 text-sm px-3 py-2 rounded-md mb-4">{message}</p>
        )}

        <div className="bg-white border border-emerald-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-emerald-100 text-emerald-900">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t border-emerald-100">
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.username}</td>
                  <td className="px-4 py-2">{member.email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="border border-teal-700 text-teal-800 hover:bg-teal-50 px-3 py-1 rounded-md"
                      onClick={() => resetPassword(member)}
                    >
                      Reset password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Members