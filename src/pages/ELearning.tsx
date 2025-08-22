import React, { useEffect, useState } from 'react'
import CourseCard from '../components/course/CourseCard'
import http from '../utils/http'
import type {Course} from '../types/elearning'
import { SectionLoader } from '../components/Loading';

type CourseResponse = { courses: Course[] };

const ELearning: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('investing-basics');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const {data} = await http.get<CourseResponse>(`/api/courses`);
        setCourses(Array.isArray(data.courses) ? data.courses : []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }finally {
        setLoading(false);
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

  const categories = [
    { label: 'Investing Basics', value: 'investing-basics' },
    { label: 'Passive Investing', value: 'passive-investing-strategies' },
    { label: 'Personal Finance', value: 'personal-finance' }
  ];

  const filteredCourses = courses.filter(course => course.category === selectedCategory);
  
  return (
    <div className='grid justify-center px-4 place-items-center '>

      <h1 className='py-5 mb-4 text-3xl font-bold'>Explore our courses to secure your future!</h1>

      <div className='flex items-center justify-between w-full'>
        <div className='flex mb-0 space-x-4'>
          {categories.map(({label, value}) => (
            <button 
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`px-4 py-2 font-semibold border-2 border-transparent hover:border-primary_lighter active:border-primary_lighter rounded-tl-md rounded-tr-md ${
              selectedCategory === value ? 'bg-primary_lighter shadow-lg' : ''
            }`}
            > 
            {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Course View */}
      <div className='flex items-center justify-center w-full p-6 mb-6 shadow-lg bg-primary_lighter rounded-bl-md rounded-br-md rounded-tr-md'>
        {loading && (
          <div className='w-full min-h-[352px] min-w-[711px] flex p-6  items-center justify-center'>
            <SectionLoader label="Loading courses…" />
          </div>
        )}
        
        {filteredCourses.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
        ): (
          !loading && (
              <div className='w-full min-h-[352px] min-w-[711px] flex p-6  items-center justify-center'>
                <p className='text-center'>
                  no courses
                </p>
              </div>
          )
          
          
        )}        
      </div>

    </div>
  )
}

export default ELearning