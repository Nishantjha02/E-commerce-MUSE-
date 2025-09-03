import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI, authAPI } from '../api.js'
import './Styles/AccountSection.css'
import UserImage from '../Assets/images/user-image.png'

function AccountSection() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({ name: '', email: '' })
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await userAPI.getProfile()
        setUser(userData)
        setEditData({ name: userData.name, email: userData.email })
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    authAPI.logout()
    navigate('/Home')
  }

  const handleEdit = async () => {
    if (editing) {
      try {
        await userAPI.updateProfile(editData)
        setUser({ ...user, ...editData })
        setEditing(false)
        alert('Profile updated successfully!')
      } catch (error) {
        alert('Error updating profile: ' + error.message)
      }
    } else {
      setEditing(true)
    }
  }

  if (!user) {
    return <div className='Account-section-container'><h1>Loading...</h1></div>
  }

  return (
    <div className='Account-section-container'>
    <div className='Account-Header'>
    <h1>My Account</h1>
    <button className='LogOutButton' onClick={handleLogout}>Log Out</button>
    </div>
    <div className="account-options">
        <div>
            <h3>Avatar</h3>
            <img src={UserImage} alt="" />
        </div>
        <div>
            <h3>Name</h3>
            {editing ? (
              <input 
                type="text" 
                value={editData.name} 
                onChange={(e) => setEditData({...editData, name: e.target.value})}
              />
            ) : (
              <h2>{user.name}</h2>
            )}
            <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
        </div>
        <div>
            <h3>Email</h3>
            {editing ? (
              <input 
                type="email" 
                value={editData.email} 
                onChange={(e) => setEditData({...editData, email: e.target.value})}
              />
            ) : (
              <h2>{user.email}</h2>
            )}
        </div>
        <div>
            <h3>Security</h3>
            <button className='Password-button' onClick={() => navigate('/ChangePassword')}>Change Password</button>
        </div>
    </div>
    </div>
  )
}

export default AccountSection