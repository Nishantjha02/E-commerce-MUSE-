import React from 'react'
import './Styles/AdminSection.css'

function AdminSection() {
  return (
    <div>
    <h1>Admin section</h1>
    <div className='Admin-option-container'>
    <button>Manage Products</button>
    <button>Users</button>
    <button>Orders</button>
    </div>
    </div>
  )
}

export default AdminSection
