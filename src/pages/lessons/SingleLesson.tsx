import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';

import type { Lesson } from '../../types/elearning';

import LayoutStandard from '../../components/lesson/LayoutStandard';
import LayoutVideo from '../../components/lesson/LayoutVideo'
import LessonCompleteButton from '../../components/LessonCompleteButton';
import LayoutImgLeft from '../../components/lesson/LayoutImgLeft';
import LayoutInteractive from '../../components/lesson/LayoutInteractive';
import { PageLoader } from '../../components/Loading';


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
  const [loading, setLoading] = useState(true)
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
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);

  if (loading) return <PageLoader label=' Loading Lesson' />
  if (error) return <div className='p-6'>Error: {error}</div>
  if (!lesson) return <div>No lesson </div>

  const layouts: Record<string, React.ComponentType<{ lesson: Lesson}>> = {
    'standard': LayoutStandard,
    'video-focused': LayoutVideo,
    'image-left': LayoutImgLeft,
    'interactive': LayoutInteractive
  };

  const layoutKey = (lesson.layout_type ?? 'standard').toLowerCase()

  const Layout = layouts[layoutKey] || LayoutStandard


  return (
    <div className='max-w-4xl p-6 mx-auto space-y-6'>
      <Layout lesson={lesson} />
      <div className={`flex ${lesson.layout_type === 'image-left' ? 'justify-end': 'justify-start'}`}>
        <LessonCompleteButton
          courseId={Number(courseId)}
          lessonId={Number(lessonId)}
         />
      </div>
      
    </div>
  )
}

export default SingleLesson