import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

interface LessonCardProps {
    courseId: string | undefined
    lessonId: number
    title: string
    description: string
    onDelete?: () => void
}


const LessonCard: React.FC<LessonCardProps> = ({courseId, lessonId, title, description, onDelete}) => {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.data?.role === 'admin';

  return (
    <div className='border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer'>
        <Link to= {`/course/${courseId}/lesson/${lessonId}`} className='flex-grow'>
           <h3 className='text-lg font-bold'>{title}</h3>
           <p className='text-gray-600'>{description}</p>
        </Link>

        {isAdmin && (
          <div className='flex justify-start gap-2 mt-4'>
            <Link to={`/course/${courseId}/lesson/update/${lessonId}`}>
              <button className='px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600'>
                Edit
              </button>
            </Link>
            <button onClick={onDelete} className='px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600'>
              Delete
            </button>
          </div>
        )}
    </div>
  )
}

export default LessonCard