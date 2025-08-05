import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const DashboardProfileCard = () => {
    const {auth} = useContext(AuthContext);

  return (
    <div className='h-40 bg-amber-200 rounded-md'>                
        <div className='flex items-start gap-4 mb-6'>
            <div className='bg-gray-500 p-3 rounded-xl'>
            </div>
            <div>
                <p className='font-semibold text-black'>Username</p>
                <p className='text-green-600'> { auth?.data?.username } </p>
            </div>
        </div>
        <div className='flex items-start gap-4 mb-6'>
            <div className='bg-gray-500 p-3 rounded-xl'>
            </div>
            <div>
                <p className='font-semibold text-black'>Username</p>
                <p className='text-green-600'> { auth?.data?.email } </p>
            </div>
            
        </div>
    </div>
  )
}

export default DashboardProfileCard