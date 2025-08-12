import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import DashboardProfileCard from '../components/DashboardProfileCard';
import DashboardAdminFunctions from '../components/DashboardAdminFunctions';

const Dashboard: React.FC = () => {
    const {auth} = useContext(AuthContext);

  return (
    <div className='max-w-screen-xl p-5 mx-auto'>
        <div className='p-4 border border-gray-300 rounded-md shadow'>

            <div>
                <h1>
                    Welcome back, { auth?.data?.username }
                </h1>
            </div>

            <div className='flex flex-col gap-6 mb-8 lg:flex-row'>

                {auth?.data?.role === 'admin' ? (
                    <>
                        {/* Admin functions*/}
                        <div className='lg:w-[40%] w-full bg-white p-4 rounded-xl shadow'>
                            <DashboardProfileCard/>
                        </div>
                        
                        <div className='lg:w-[60%] w-full bg-white p-4 rounded-xl shadow'>
                            <h2 className='mb-4 text-xl font-semibold'>My Functions</h2>
                            <DashboardAdminFunctions/>
                        </div>
                        
                    </>
                ) : (
                    <>
                        {/* Profil info*/}
                        <div className='lg:w-[30%] w-full bg-white p-4 rounded-xl shadow'>
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