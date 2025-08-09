import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import http from '../utils/http'
import type {Course} from '../types/elearning'

type CourseResponse = { courses: Course[] };

const ELearning: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const {data} = await http.get<CourseResponse>(`/api/courses`);
        setCourses(Array.isArray(data.courses) ? data.courses : []);
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
    <div className='grid max-w-6xl place-items-center'>
      <div className='w-full pl-4'>
        <div className='flex mb-0 space-x-4'>
          <button className='px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-outer border-3 border-[#A7DCA5]'>
            Investing
          </button>
          <button className='px-4 py-2 font-semibold text-black rounded-lg bg-primary'>
            Personal Finance
          </button>
          <button className='px-4 py-2 font-semibold text-black rounded-lg bg-midnight'>
            Lorem ipsum
          </button>
        </div>
      </div>
      <div className='bg-[#A7DCA5] rounded-xl shadow-lg p-6'>

        {/* Course Cards */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
        
      </div>

    </div>
  )
}

export default ELearning