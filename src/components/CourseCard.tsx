import React from 'react'
import { Link } from 'react-router-dom';
import { getThumbnailUrl } from '../utils/getThumbnailUrl';
import type { Course } from '../types/elearning';
import { useAuth } from "../hooks/useAuth";

interface CourseCardProps {
    /* course: Pick<Course, 'id' | 'title' | 'summary' | 'duration' | 'thumbnail'>; */
    course: Course;
    onDelete?: () => void;
}

const CourseCard:React.FC<CourseCardProps> = ({ course, onDelete }) => {
/*     const {auth} = useContext(AuthContext); */
    const {isAdmin} = useAuth();
/*     const isAdmin = auth?.data?.role === 'admin'; */
    const thumbnailUrl = getThumbnailUrl(course.thumbnail ?? null);

  return (
    <div className='overflow-hidden bg-white shadow-md rounded-xl'>
        <Link to={`/course/${course.id}`}>

            {/* Thumbnail */}
            {thumbnailUrl ? (
            <img
                src={thumbnailUrl}
                alt={course.title}
                className="object-cover w-full h-48"
                />
            ) : (
            <div className='flex items-center justify-center w-full h-48 bg-gray-300'>
                No Image
            </div>
            )}

            {/* Info */}
            <div className='p-4'>
            <h3 className='mb-1 text-xl font-semibold'>{course.title}</h3>
            <p className='mb-2 text-sm text-gray-600'>{course.summary}</p>
            <p className='text-sm text-gray-500'>Duration: {course.duration}</p>
            </div>
        </Link>

        {/* Buttons if admin is logged in */}
        {isAdmin && onDelete && (
            <div className='flex justify-end gap-2 p-4'>
                <Link to={`/course/update/${course.id}`}>
                    <button className=' btn-edit' type='button'>Edit</button>
                </Link>
                <button 
                    onClick={onDelete}
                    className='btn-delete'
                    type='button'
                >
                    Delete
                </button>
            </div>
        )}
    </div>
  )
}

export default CourseCard