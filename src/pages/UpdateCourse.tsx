import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from '../components/course/CourseForm';
import { useForm } from 'react-hook-form';
import http from '../utils/http';
import type { CourseFormValues } from '../types/elearning';


interface ErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
    };
  };
}

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setError } = useForm<CourseFormValues>();
  const [defaultValues, setDefaultValues] = useState<CourseFormValues | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await http.get(`/api/course/${courseId}`);
       {/* console.log(response.data);*/}
        const course = response.data.course;

        setDefaultValues({
          title: course.title || '',
          slug: course.slug || '',
          summary: course.summary || '',
          category: course.category || '',
          thumbnail: [] as unknown as FileList,
          description: course.description || '',
          duration: course.duration || '',
          status: course.status || '',
          thumbnailUrl: `http://localhost:8000/${course.thumbnail}`,
        });
      } catch (error) {
        console.error('Failed to load course data', error);
      }
    }; fetchCourse();
  }, [courseId]);

  const onSubmit = async (data: CourseFormValues) => {
    try {
      await http.get('/sanctum/csrf-cookie');

      const courseFormData = new FormData();
      courseFormData.append('title', data.title);
      courseFormData.append('slug', data.slug);
      courseFormData.append('summary', data.summary);
      if (data.thumbnail && data.thumbnail.length > 0) {
        courseFormData.append('thumbnail', data.thumbnail[0]);
      }
      courseFormData.append('description', data.description);
      courseFormData.append('duration', String(data.duration));
      courseFormData.append('status', data.status);
      courseFormData.append('category', data.category);

      await http.post(`/api/course/update/${courseId}`, courseFormData);

      navigate('/elearning');
      
    }  catch (error) {
      const err = error as ErrorResponse;
      const validationErrors = err.response?.data?.errors; 

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([key, value]) => {
          setError(key as keyof CourseFormValues, {
            type:'manual',
            message: value[0],
          });
        });
      }
    } 
  };

  if (!defaultValues) return <div className='text-center'>Loading...</div>

  return (
    <div>
       <CourseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        mode="update"
      />
    </div>
  )
}

export default UpdateCourse;