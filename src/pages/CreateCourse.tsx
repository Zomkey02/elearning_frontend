import React from 'react'
import CourseForm from '../components/CourseForm';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import http from '../utils/http';

type CourseFormValues = {
  title: string;
  slug: string;
  summary: string;
  thumbnail: FileList;
  description: string;
  duration: string;
  status: string;
};

interface ErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
    };
  };
}

const CreateCourse = () => {
  const navigate = useNavigate();
  const {setError} = useForm<CourseFormValues>();

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
      courseFormData.append('duration', data.duration);
      courseFormData.append('status', data.status);

      const response = await http.post('/api/course', courseFormData);

      if (response.status === 201) {
        navigate('/dashboard');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
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
  }

  return (
    <CourseForm onSubmit={onSubmit} legend='Create a New Course' />
  )
}

export default CreateCourse;