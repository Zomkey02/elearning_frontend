import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Dashboard = () => {
    const {auth} = useContext(AuthContext);

  return (
    <div>
        Dashboard
        <div className="p-4 border border-gray-300 rounded-md shadow">
            <p>Status: {auth.status}</p>
            {auth.data ? (
                <p>Logged in as: {auth.data.username}</p>
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    </div>
  )
}

export default Dashboard