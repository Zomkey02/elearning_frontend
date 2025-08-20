import React, { useEffect, useState } from 'react'
import http from '../utils/http';
import type { Course } from '../types/elearning';

type Props = {course: Course; showCaption?: boolean;};

const CourseProgressRow: React.FC<Props> =({course, showCaption = true}) => {
    const [completed, setCompleted] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchProgress = async () => {
        setLoading(true);
        try {
          const res = await http.get(`/api/user/progress/${course.id}`, {withCredentials: true});
          setCompleted(res.data?.completedLessons ?? 0);
          setTotal(res.data?.totalLessons ?? 0);
        } catch (e) {
            console.error('progress fetch failed', e);
            setCompleted(0);
            setTotal(0);
        } finally {
          setLoading(false);
        }
      }; 
      fetchProgress(); 
    }, [course.id]);

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const percentLabel = loading ? "—" : `${percent}%`;
    const caption = loading ? "Loading…" : `${completed} of ${total} lessons completed`;
    const barWidth = loading ? '30%' : `${Math.min(percent, 100)}%`;
    const barClass = loading ? 'bg-primary/50 animate-pulse' : 'bg-primary';


    if (loading) return (
      <div className='flex items-start'>Loading course progress</div> 
    )

  return (
    <div className=' mb-2.5'>
      <div className='flex items-center justify-between'>

        {showCaption && ( <p className='text-sm'>{caption}</p> )}
        <span className='text-sm'>{percentLabel}</span>

      </div>

      <div className='w-full h-2 overflow-hidden rounded-full bg-primary/30'>
        <div
            role='progressbar'
            aria-label = {`progress for ${course.title}`}
            className={`h-2 ${barClass} rounded-full transition-all`}
            style= {{ width:barWidth }}
        >
        </div>
      </div>

    </div>
  )
}

export default CourseProgressRow