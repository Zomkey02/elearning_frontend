import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom';
import ProfileFormUpdate from './ProfileFormUpdate';

const DashboardProfileCard = () => {
    const {auth, setAuth} = useContext(AuthContext);
    const [editing, setEditing] = useState(false);

    if (!auth?.data) return null;

    const user = auth.data;

    const handleUpdateSuccess = (updatedUser: {id: number; username: string; email: string}) => {
        setAuth({
            data: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: user.role,
            },
            status: 'loggedIn',
        });
        setEditing(false);
    };

  return (
    <div>         
        <div className='flex items-center justify-between mb-4'>
            <h2 className='mb-4 text-xl font-semibold'>{editing ? 'Edit My Profile' : 'My Profile'}</h2>
            {editing && (
                <button className='btn-primary' onClick={() => setEditing(false)}>
                    Cancel Editing
                </button>
            )}
        </div>  

        {!editing ? (
            <>
                <div className='flex items-start gap-4 mb-6'>
                    <div className='p-3 bg-gray-500 rounded-xl'>
                    </div>
                    <div>
                        <p className='font-semibold text-black'>Username</p>
                        <p className='text-green-600'> { auth.data.username } </p>
                    </div>
                </div>

                <div className='flex items-start gap-4 mb-6'>
                    <div className='p-3 bg-gray-500 rounded-xl'>
                    </div>
                    <div>
                        <p className='font-semibold text-black'>Email</p>
                        <p className='text-green-600'> { auth.data.email } </p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <button className='btn-primary' onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>
                    <button className='btn-primary'>Delete User</button>
                </div>
            </>
        ) : (
            <>
                <ProfileFormUpdate
                    defaultValues={{ 
                        username: auth.data.username,
                        email: auth.data.email,
                    }}
                    onSuccess={handleUpdateSuccess}
                    className='w-full p-0 bg-transparent shadow-none'
                />
            </>
        )}
    </div>
  )
}

export default DashboardProfileCard