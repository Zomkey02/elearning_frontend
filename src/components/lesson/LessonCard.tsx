import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lesson } from '../../types/elearning'
import { useAuth } from '../../hooks/useAuth'

type LessonCardProps = {
    courseId: string 
    /* lesson: Pick<Lesson, 'id' | 'title' | 'duration' | 'level'>; */
    lesson: Lesson
    onDelete?: () => void
};


const LessonCard: React.FC<LessonCardProps> = ({courseId, lesson, onDelete}) => {
/*   const { auth } = useContext(AuthContext);
  const isAdmin = auth?.data?.role === 'admin'; */
  const {isAdmin} = useAuth();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if(!confirming) {
      setConfirming(true);
      return;
    }
    onDelete?.();
  };

  return (
    <div className='p-4 mt-6 mb-6 transition border rounded-lg shadow-md cursor-pointer hover:shadow-lg'>
        <Link to= {`/course/${courseId}/lesson/${lesson.id}`} className='flex '>
          <h3 className='text-lg font-bold'>{lesson.title}</h3>
          <div className='flex justify-end flex-grow space-x-4 text-sm text-gray-600'>
            {lesson.duration !== null && (
              <p><strong>Duration:</strong> {lesson.duration} min</p>
            )}
            {lesson.level !== null && (
              <p><strong>Level:</strong> {lesson.level}</p>
            )}
          </div>
           
        </Link>

        {isAdmin && (
          <div className='flex justify-start gap-2 mt-4'>
            <Link to={`/course/${courseId}/lesson/update/${lesson.id}`}>
              <button className='btn-edit'>
                Edit
              </button>
            </Link>
            <button 
              onClick={handleClick} 
              className={`btn-delete ${confirming? 'bg-danger text-white' : 'btn-delete'} `}
            >
              {confirming ? 'Confirm Delete' : 'Delete'}
            </button>
            {confirming && (
              <button onClick= {() => setConfirming(false)} className='btn-cancel'> 
                Cancel
              </button>
            )}
          </div>
        )}
    </div>
  )
}

export default LessonCard