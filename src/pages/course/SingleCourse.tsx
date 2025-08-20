import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import http from '../../utils/http'
import LessonCard from '../../components/lesson/LessonCard'
import { getThumbnailUrl } from '../../utils/getThumbnailUrl'
import type {Course, Lesson} from '../../types/elearning'
import SafeHTML from '../../utils/SafeHTML'
import { useAuth } from '../../hooks/useAuth'
import { PageLoader } from '../../components/Loading'
import CourseProgressRow from '../../components/CourseProgressRow'

/* interface Lesson {
    id: number
    title: string
    description: string
}

interface SingleCourse {
    courseId: number
    title: string
    thumbnail?: string
    summary: string
    description: string
    lessons?: Lesson[]
} */

type CourseResponse = { course: Course };

const SingleCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>()
    if (!courseId) return null;
    const [course, setCourse] = useState<Course | null>(null)  
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
/*     const {auth} = useContext(AuthContext);
    const isAdmin = auth?.data?.role === 'admin'; */
    const {isAdmin, isLoggedIn} = useAuth();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!courseId) {
                    setError('Missing courseId');
                    return;
                }
                const {data} = await http.get<CourseResponse>(`/api/course/${courseId}`);
                setCourse(data.course);

                if (!data.course.lessons || data.course.lessons.length === 0) {
                    console.warn('No lessons found for this course')
                }
            } catch (err) {
                const msg = err instanceof Error ? err.message: 'Unknown error';
                console.error('Failed to fetch courses:', err);
                setError(msg);
            } finally {
                setLoading(false)
            }
        };
        fetchCourse();
    }, [courseId]);

    if (loading) return <PageLoader label=' Loading Course' />
    if (error) return <div className='p-6'>Error: {error}</div>
    if (!course) return <div className="p-6">No course found</div>


    const thumbnailUrl = getThumbnailUrl(course.thumbnail ?? null);

    const handleDeleteLesson = async (lessonId: number) => {
        try {
        await http.delete(`/api/course/${courseId}/lesson/delete/${lessonId}`);
        setCourse(prev => 
            prev
                ? {...prev, lessons: (prev.lessons ?? []).filter(lesson => lesson.id !== lessonId)}
                : prev
        );
        } catch (error) {
        console.error('Failed to delete lesson:', error);
        }
    };
    
  return (
    <div className='max-w-4xl p-6 mx-auto space-y-6'>
        <div className='space-y-2'>
            {/* Thumbnail */}
            {thumbnailUrl ? (
                <img
                    src={ thumbnailUrl }
                    alt={course.title}
                    className="object-cover w-full h-64 rounded-lg shadow"
                    />
                ) : (
                <div className='flex items-center justify-center w-full h-64 text-gray-600 bg-gray-300 rounded-lg shadow'>
                    No Image
                </div>
            )}
            <h1 className='font-bold'>{course.title}</h1>

            {/* <p className='text-gray-600 whitespace-pre-line'>{course.description}</p> */}
            <SafeHTML html={course.description} className='max-w-none' />
        </div>

        <div className='mt-6'>
            <h2 className='mb-4 text-2xl font-semibold'>Lessons</h2>

            {isLoggedIn && (
                <CourseProgressRow course={course} showCaption={true} />
            )}

            {isAdmin && (
                <div className='mb-10'>
                    <div className='flex flex-wrap gap-4'>
                        <Link to={`/course/${courseId}/lesson/create`} className='btn-primary'>
                            Create Lesson
                        </Link>
                    </div>
                </div>
            )}
            
            {course.lessons && course.lessons.length > 0 ? (        
                course.lessons?.map((lesson: Lesson) => (
                    <LessonCard
                        key={lesson.id}
                        courseId={courseId}
                        lesson={lesson}
                        onDelete={() => handleDeleteLesson(lesson.id)}
                    />
                    )) 
                ) : (
                    <p className='text-gray-600'>No lessons available</p>
            )}
        </div>
    </div>
  )
}

export default SingleCourse