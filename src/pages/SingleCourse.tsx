import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import http from '../utils/http'
import LessonCard from '../components/LessonCard'

interface Lesson {
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
}

const SingleCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>()
    const [course, setCourse] = useState<SingleCourse | null>(null)  
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await http.get(`/api/course/${courseId}`);
                console.log('Api response', response.data);
                
                setCourse(response.data.course)

                if (!response.data.course.lessons || response.data.course.lessons.length === 0) {
                    console.warn('No lessons found for this course')
                }
            } catch (err: any) {
                console.error('Failed to fetch courses:', err);
                setError(err.message);
            } finally {
                setLoading(false)
            }
        };
        fetchCourse();
    }, [courseId]);

    if (loading) return <div className='p-6'>Loading...</div>
    if (error) return <div className='p-6'>Error: {error}</div>
    if (!course) return <div className="p-6">No course found</div>


    const thumbnailUrl = course.thumbnail
        ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : course.thumbnail.startsWith('storage/')
            ? `http://localhost:8000/${course.thumbnail}`
            : `http://localhost:8000/storage/${course.thumbnail}`
        :null

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
        <div className='space-y-2'>
            {/* Thumbnail */}
            {thumbnailUrl ? (
                <img
                    src={ thumbnailUrl }
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg shadow"
                    />
                ) : (
                <div className='w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg shadow'>
                    No Image
                </div>
            )}
            <h1 className='text-2xl font-bold'>{course.title}</h1>
            <p className= 'text-gray-700'>{course.summary}</p>
            <p className='text-gray-600 whitespace-pre-line'>{course.description}</p>
        </div>

        <div className='mt-6'>
            <h2 className='text-2xl font-semibold mb-4'>Lessons</h2>

            <div className='mb-10'>
                <h3 className='text-xl font-semibold mb-4'>Lessons</h3>
                <div className='flex gap-4 flex-wrap'>
                    <Link to={`/course/${courseId}/lesson/create`} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800'>
                        Create Lesson
                    </Link>
                </div>
            </div>
            
            {course.lessons && course.lessons.length > 0 ? (        
                course.lessons?.map((lesson: any) => (
                    <LessonCard
                        key={lesson.id}
                        courseId={courseId}
                        lessonId={lesson.id}
                        title={lesson.title}
                        description={lesson.description}
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