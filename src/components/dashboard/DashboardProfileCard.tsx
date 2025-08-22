import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileFormUpdate from './ProfileFormUpdate';
import http from '../../utils/http';
import { useAuth } from '../../hooks/useAuth';
import { IconContext } from 'react-icons';
import { RiMailLine, RiUserLine } from 'react-icons/ri';

const DashboardProfileCard = () => {
    const {user, isLoading, setAuth} = useAuth();
    const [editing, setEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const navigate = useNavigate();

    if (isLoading) return <div className='text-sm'>Loading Profile Info</div>
    if (!user) return null;

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
            navigate('/signup');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Account deletion failed, please check your password and try again.');
        }
    };

  return (
    <div className='w-full'>         
        <div className='flex items-center justify-between max-w-sm mb-4'>
            <h2 className='text-xl'>{editing ? 'Edit My Profile' : 'My Profile'}</h2>
            {editing && (
                <button className='btn-cancel' onClick={() => setEditing(false)}>
                    Cancel Editing
                </button>
            )}
        </div>  

        {!editing ? (
            <>
                <div className='flex items-start gap-4 mb-6'>
                    <div className='p-1'>
                        <IconContext value={{ size:'1.2em'}}><RiUserLine /></IconContext>
                    </div>
                    <div>
                        <p className='text-primary'> { user.username } </p>
                    </div>
                </div>

                <div className='flex items-start gap-4 mb-6'>
                    <div className='p-1'>
                        <IconContext value={{ size:'1.2em'}}><RiMailLine /></IconContext>
                    </div>
                    <div>
                        <p className='text-primary'> { user.email } </p>
                    </div>
                </div>
                <div className='flex w-full gap-3'>
                    <button className='self-start flex-shrink-0  btn-edit' onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>

                    {!confirmDelete ? (
                        <button className='btn-delete' onClick={() => setConfirmDelete(true)}>Delete User</button>
                    ): (
                        <div className='flex flex-col w-full gap-2'>
                            <input 
                                type="password"
                                placeholder='Enter current password'
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                className='max-w-xs h-9 auth-input'
                            />
                            <div className='flex justify-between max-w-xs gap-2'>
                                <button className='btn-cancel' onClick={() => {setConfirmDelete(false); setDeletePassword('');}}>Cancel</button>
                                <button className='text-white btn-delete bg-danger' onClick={handleDeleteUser}>Confirm Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <>
                <ProfileFormUpdate
                    defaultValues={{ 
                        username: user.username,
                        email: user.email,
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