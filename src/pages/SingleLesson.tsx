import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../utils/http';

interface SingleLesson {
    lessonId: number
    title: string
    summary: string
}

const SingleLesson: React.FC = () =>{
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [lesson, setLesson ] = useState<any>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId || !lessonId) {
      console.error('missing courseId or lessonId');
      return;
    }

    const fetchLesson = async () => {
      try {
        const response = await http.get(`api/course/${courseId}/lesson/${lessonId}`);
        console.log('api response', response.data);
        setLesson(response.data.lesson);
      } catch (err:any) {
        console.error('Failed to fetch courses:', err);
        setError(err.message);
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);


  if (!lesson) return <div>Loading...</div>
  if (error) return <div className='p-6'>Error: {error}</div>


  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.summary}</p>

    </div>
  )
}

export default SingleLesson