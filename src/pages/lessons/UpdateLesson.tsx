import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LessonForm from '../../components/lesson/LessonForm'
import http from '../../utils/http';
import type { LessonFormValues } from '../../types/elearning';
import { SectionLoader } from '../../components/Loading';
import type { ErrorResponse } from '../../types/Types';


const UpdateLesson = () => {
  
  const { courseId, lessonId } = useParams<{courseId: string; lessonId: string}>();
  const navigate = useNavigate();
  const {setError} = useForm<LessonFormValues>();
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([])
  const [defaultValues, setDefaultValues] = useState<LessonFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (!courseId || !lessonId) {
          console.error('missing course or lessson')
          setLoading(false);
          return;
        }

        const response = await http.get(`/api/course/${courseId}/lesson/${lessonId}`);
        const lesson = response.data.lesson;
        const allCourses = (response.data.courses);

        setCourses(allCourses);
        
        setDefaultValues({
          course_id: lesson.course_id,
          title: lesson.title,
          slug: lesson.slug,
          summary: lesson.summary,
          content: lesson.content,
          thumbnail: [] as unknown as FileList,
          duration: lesson.duration,
          level: lesson.level,
          status: lesson.status,
          layout_type: lesson.layout_type ,
          thumbnailUrl: `http://localhost:8000/${lesson.thumbnail}`,
        });
      } catch (error) {
        console.error('Failed to fetch lesson data:', error);
      } finally {
        setLoading(false);
      }
    }; fetchLesson();

  }, [courseId, lessonId]);

  if (loading) {
    return (
      <div className='text-center'>
        <SectionLoader label='Loading Lesson Data' />
      </div>
    );
  }

  if (!defaultValues) {
    return <div>Lesson Data not found.</div>
  }

  const onSubmit = async (data: LessonFormValues) => {
    try {
      await http.get('/sanctum/csrf-cookie');

      const lessonFormData = new FormData();
      lessonFormData.append('title', data.title);
      lessonFormData.append('slug', data.slug);
      lessonFormData.append('summary', data.summary);
      lessonFormData.append('content', data.content);
      if (data.thumbnail?.[0]) {
        lessonFormData.append('thumbnail', data.thumbnail[0]);
      }
      lessonFormData.append('duration', String(data.duration));
      lessonFormData.append('level', data.level);
      lessonFormData.append('status', data.status);
      lessonFormData.append('layout_type', data.layout_type);
      lessonFormData.append('course_id', data.course_id);

      await http.post(`/api/course/${data.course_id}/lesson/update/${lessonId}`, lessonFormData);

      navigate(`/course/${data.course_id}/lesson/${lessonId}`);

    } catch (error) {
      const err = error as ErrorResponse;
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([key, value]) => {
          setError(key as keyof LessonFormValues, {
            type:'manual',
            message: value[0],
          });
        });
      }
    }
  };

  return (
    <div>
      <LessonForm
        onSubmit={onSubmit}
        mode = 'update' 
        courses={courses}
        defaultValues={defaultValues}
        courseIdFromURL={courseId}
      />
    </div>
  )
}

export default UpdateLesson