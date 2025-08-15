import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';

import type { Lesson } from '../../types/elearning';

import LayoutStandard from '../../components/lesson/LayoutStandard';
import LayoutVideo from '../../components/lesson/LayoutVideo'


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

  const layouts: Record<string, React.ComponentType<{ lesson: Lesson}>> = {
    'standard': LayoutStandard,
    'video-focused': LayoutVideo

  };

  const layoutKey = (lesson.layout_type ?? 'standard').toLowerCase()

  const Layout = layouts[layoutKey] || LayoutStandard


  return (
    <div>
      <Layout lesson={lesson} />
    </div>
  )
}

export default SingleLesson