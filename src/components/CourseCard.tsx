import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

interface CourseCardProps {
  courseId: number;
  title: string;
  summary: string;
  duration: string;
  thumbnail?: string;
  onDelete?: () => void;
}

const CourseCard:React.FC<CourseCardProps> = ({ courseId, title, summary, duration, thumbnail, onDelete }) => {
    const {auth} = useContext(AuthContext);

  return (
    <div className='rounded-xl overflow-hidden shadow-md bg-white'>
        <Link to={`/course/${courseId}`}>

            {/* Thumbnail */}
            {thumbnail ? (
            <img
                src={
                    thumbnail.startsWith('http')
                    ? thumbnail
                    : thumbnail.startsWith('storage/')
                        ? `http://localhost:8000/${thumbnail}`
                        : `http://localhost:8000/storage/${thumbnail}`
                }
                alt={title}
                className="w-full h-48 object-cover"
                />
            ) : (
            <div className='w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600'>
                No Image
            </div>
            )}

            {/* Info */}
            <div className='p-4'>
            <h3 className='text-xl font-semibold mb-1'>{title}</h3>
            <p className='text-gray-600 text-sm mb-2'>{summary}</p>
            <p className='text-sm text-gray-500'>Duration: {duration}</p>
            </div>
        </Link>

        {/* Buttons if admin is logged in */}
        {auth?.data?.role === 'admin' && onDelete && (
            <div className='flex justify-end p-4 gap-2'>
                <Link to={`/course/update/${courseId}`}>
                    <button className='px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600'>Edit</button>
                </Link>
                <button 
                    onClick={onDelete}
                    className='px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600'
                >
                    Delete
                </button>
            </div>
        )}
    </div>
  )
}

export default CourseCard