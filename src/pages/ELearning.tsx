import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import http from '../utils/http'

type Course = {
  id: number;
  title: string;
  summary: string;
  duration: string;
  thumbnail?: string;
};

const ELearning: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await http.get('/api/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId: number) => {
    try {
      await http.delete(`/api/course/delete/${courseId}`);
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };
  
  return (
    <div className='flex justify-center  min-h-screen'>
      <div className='bg-green-200 rounded-xl shadow-lg w-full max-w-5xl p-6'>

        <div className='flex space-x-4 mb-6'>
          <button className='px-4 px-2 bg-white text-black font-semibold rounden-t-md shadow-inner'>
            Investing
          </button>
          <button className='px-4 px-2 bg-green-300 text-black font-semibold rounden-t-md'>
            Personal Finance
          </button>
          <button className='px-4 px-2 bg-green-300 text-black font-semibold rounden-t-md'>
            Lorem ipsum
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              courseId={course.id}
              title={course.title}
              summary={course.summary}
              duration={course.duration}
              thumbnail={course.thumbnail}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
          
        </div>

      </div>

    </div>
  )
}

export default ELearning