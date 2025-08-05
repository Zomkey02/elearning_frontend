import React from 'react'
import { Link } from 'react-router-dom'

const DashboardAdminFunctions = () => {
  return (
    <div className='max-w-4xl mx-auto rounded-md'>

        <div className='mb-10'>
            <h3 className='text-xl font-semibold mb-4'>Courses</h3>
            <div className='flex gap-4 flex-wrap'>
                <Link to='/course/create' className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800'>
                    Create Course
                </Link>
            </div>
        </div>
        <div className='mb-10'>
            <h3 className='text-xl font-semibold mb-4'>Lessons</h3>
            <div className='flex gap-4 flex-wrap'>
                <Link to='/lesson/create' className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800'>
                    Create Lesson
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardAdminFunctions