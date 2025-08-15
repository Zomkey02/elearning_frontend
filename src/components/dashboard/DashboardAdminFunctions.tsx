import React from 'react'
import { Link } from 'react-router-dom'

const DashboardAdminFunctions = () => {
  return (
    <div className='max-w-4xl mx-auto rounded-md'>

        <div className='mb-10'>
            <h3 className='mb-4 text-xl font-semibold'>Courses</h3>
            <div className='flex flex-wrap gap-4'>
                <Link to='/course/create' className='px-4 py-2 text-white rounded bg-primary hover:bg-green-800'>
                    Create Course
                </Link>
            </div>
        </div>
        <div className='mb-10'>
            <h3 className='mb-4 text-xl font-semibold'>Lessons</h3>
            <div className='flex flex-wrap gap-4'>
                <Link to='/lesson/create' className='px-4 py-2 text-white rounded bg-primary hover:bg-green-800'>
                    Create Lesson
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardAdminFunctions