import React from 'react'
import DashboardProfileCard from '../components/dashboard/DashboardProfileCard';
import DashboardAdminFunctions from '../components/dashboard/DashboardAdminFunctions';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
    const {user, isAdmin} = useAuth();
    
  return (
    <div className='max-w-screen-xl p-5 mx-auto'>
        <div className='p-4 border border-gray-300 rounded-md shadow'>

            <div>
                <h1>
                    Welcome back, { user?.username }
                </h1>
            </div>

            <div className='flex flex-col gap-6 mb-8 lg:flex-row'>

                {isAdmin ? (
                    <>
                        {/* Admin functions*/}
                        <div className='lg:w-[70%] w-full bg-white p-4 rounded-xl shadow'>
                            <DashboardProfileCard/>
                        </div>
                        
                        <div className='lg:w-[30%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='mb-4 text-xl font-semibold'>My Functions</h2>
                            <DashboardAdminFunctions/>
                        </div>
                        
                    </>
                ) : (
                    <>
                        {/* Profil info*/}
                        <div className='p-4 bg-white shadow lg:w-full rounded-xl'>
                            <DashboardProfileCard/>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default Dashboard