import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import DashboardProfileCard from '../components/DashboardProfileCard';
import DashboardAdminFunctions from '../components/DashboardAdminFunctions';

const Dashboard: React.FC = () => {
    const {auth} = useContext(AuthContext);

  return (
    <div className='p-5 max-w-screen-xl mx-auto'>
        <div className='p-4 border border-gray-300 rounded-md shadow'>

            <div>
                <h1>
                    Welcome back, { auth?.data?.username }
                </h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-6 mb-8'>

                {auth?.data?.role === 'admin' ? (
                    <>
                        {/* Admin functions*/}
                        <div className='lg:w-[70%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='text-xl font-semibold mb-4'>My Functions</h2>
                            <DashboardAdminFunctions/>
                        </div>
                        <div className='lg:w-[30%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='text-xl font-semibold mb-4'>My Profile</h2>
                            <DashboardProfileCard/>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Profil info*/}
                        <div className='lg:w-[30%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='text-xl font-semibold mb-4'>My Profile</h2>
                            <DashboardProfileCard/>
                        </div>
                    </>
                )}
            </div>

            {/*temporary info*/}
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