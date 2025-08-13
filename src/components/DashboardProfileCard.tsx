import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfileFormUpdate from './ProfileFormUpdate';
import http from '../utils/http';

const DashboardProfileCard = () => {
    const {auth, setAuth} = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const navigate = useNavigate();

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

    const handleDeleteUser = async () => {
        if (!deletePassword.trim()) {
            alert('Please enter your current password.');
            return;
        }

        if(!confirm('Are you sure you want to delete you Account. The account cannot be recovered afterwards.')) return;

        try {
            await http.get('/sanctum/csrf-cookie');
            await http.delete('/api/delete', {
                data: {password: deletePassword },
            });

            setAuth({ data: null, status: 'loggedOut'});
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Account deletion failed, please check your password and try again.');
        }
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

                    {!confirmDelete ? (
                        <button className='btn-primary' onClick={() => setConfirmDelete(true)}>Delete User</button>
                    ): (
                        <div className='flex items-center gap-2'>
                            <input 
                                type="password"
                                placeholder='Enter current password'
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded'
                            />
                            <div className='flex gap-2'>
                                <button className='btn-primary' onClick={() => {setConfirmDelete(false); setDeletePassword('');}}>Cancel</button>
                                <button className='btn-primary' onClick={handleDeleteUser}>Confirm Delete</button>
                            </div>
                        </div>
                    )}
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