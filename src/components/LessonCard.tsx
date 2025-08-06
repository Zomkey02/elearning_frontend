import React from 'react'
import { Link } from 'react-router-dom'

interface LessonCardProps {
    courseId: string | undefined
    lessonId: number
    title: string
    description: string
}


const LessonCard: React.FC<LessonCardProps> = ({courseId, lessonId, title, description}) => {
  return (
    <div className='border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer'>
        <Link to= {`/course/${courseId}/lesson/${lessonId}`}>
           <h3 className='text-lg font-bold'>{title}</h3>
           <p className='text-gray-600'>{description}</p>
        </Link>
    </div>
  )
}

export default LessonCard