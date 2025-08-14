import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../utils/http';
import { getThumbnailUrl } from '../utils/getThumbnailUrl';
import type { Lesson } from '../types/elearning';


/* interface SingleLesson {
    lessonId: number
    title: string
    summary: string
    content: string;
    thumbnail: string;
    duration: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    status: 'draft' | 'published';
    layout_type: 'standard' | 'video-focused' | 'image-left' | 'interactive';
} */

type LessonResponse = { lesson: Lesson };

const SingleLesson: React.FC = () =>{
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [lesson, setLesson ] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId || !lessonId) {
      console.error('missing courseId or lessonId');
      return;
    }

    const fetchLesson = async () => {
      try {
        const {data} = await http.get<LessonResponse>(`/api/course/${courseId}/lesson/${lessonId}`);
        setLesson(data.lesson);
      } catch (err:unknown) {
        const msg = err instanceof Error ? err.message: 'Unknown error';
        console.error('Failed to fetch lessons:', err);
        setError(msg);
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);

  
  if (error) return <div className='p-6'>Error: {error}</div>
  if (!lesson) return <div>Loading...</div>

  const thumbnailUrl = getThumbnailUrl(lesson.thumbnail ?? null);

  return (
    <div className='max-w-4xl p-6 mx-auto space-y-6'>

      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${lesson.title}`}
          className='object-cover w-full h-64 rounded-lg shadow'
        />
      ) : (<div>No thumbnail available</div> )}

      <h1>{lesson.title}</h1>
      <div className='flex items-center'>
        {lesson.duration !== null && (
          <p className='mr-6'><strong>Duration:</strong> {lesson.duration} min</p>
        )}
        {lesson.level !== null && (
          <p><strong>Level:</strong> {lesson.level}</p>
        )}
      </div>
      
      {lesson.content && <div className='whitespace-pre-line'>{lesson.content}</div>}

    </div>
  )
}

export default SingleLesson