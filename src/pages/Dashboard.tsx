import React from 'react'
import DashboardProfileCard from '../components/dashboard/DashboardProfileCard';
import { useAuth } from '../hooks/useAuth';
import DashboardUserProgress from '../components/dashboard/DashboardUserProgress';

const Dashboard: React.FC = () => {
    const {user, isAdmin} = useAuth();
    
  return (
    <div className='max-w-screen-xl p-5 mx-auto '>
        <div className='p-4 border border-gray-300 rounded-md shadow w-lg md:w-3xl'>

            <div>
                <h1 className='text-xl'>
                    Welcome back, { user?.username }
                </h1>
            </div>

            <div className='flex mb-8 '>

                {isAdmin ? (
                    <div className='w-full'>
                        {/* Admin functions*/}
                        <div className='w-full p-4 bg-white shadow rounded-xl'>
                            <DashboardProfileCard/>
                        </div>
                        
                        {/* Following functions were deactivated, since the buttons are moved into the navigationbar. */}
                        {/* <div className='lg:w-[30%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='mb-4 text-xl font-semibold'>My Functions</h2>
                            <DashboardAdminFunctions/>
                        </div> */}

                        <div className='w-full p-4'>
                            <DashboardUserProgress />
                        </div>
                        
                    </div>
                ) : (
                    <>
                        {/* Profil info*/}
                        <div className='p-4 bg-white shadow lg:w-[50%} w-full rounded-xl'>
                            <DashboardProfileCard/>
                        </div>
                        <div className='lg:w-[40%]'>
                            <DashboardUserProgress />
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default Dashboard