import { useEffect, useState } from 'react'
import LessonForm from '../../components/lesson/LessonForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import http from '../../utils/http';
import type { LessonFormValues } from '../../types/elearning';


interface ErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
    };
  };
}

const CreateLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{courseId: string}>();
  const {setError} = useForm<LessonFormValues>();
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await http.get(`/api/courses`);
        const fetchCourses = response.data.courses;
        setCourses(fetchCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [courseId]);

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

      await http.post(`/api/course/${data.course_id}/lesson`, lessonFormData);

      navigate(`/course/${data.course_id}`);
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
  }

  return (
    <div>
      <LessonForm
        onSubmit={onSubmit}
        mode = 'create' 
        courses={courses}
        defaultValues={courseId ? { course_id: courseId } : undefined}
        courseIdFromURL={courseId}
      />
    </div>
  );
};

export default CreateLesson