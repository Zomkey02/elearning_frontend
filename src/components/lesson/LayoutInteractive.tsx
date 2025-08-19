import React, { useState } from 'react'
import { getThumbnailUrl } from '../../utils/getThumbnailUrl';
import type { Lesson } from '../../types/elearning';
import SafeHTML from '../SafeHTML';

type LessonResponse = { lesson: Lesson };

export default function LayoutInteractive({lesson}: LessonResponse) {

    const thumbnailUrl = getThumbnailUrl(lesson.thumbnail ?? null);

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for ${lesson.title}`}
              className='object-cover w-full h-64 mb-0 rounded-lg shadow-sm'
            />
          ) : (
            <div className='flex items-center justify-center w-full h-64 bg-gray-200 rounded-xl'>
              No thumbnail available
            </div> 
          )}
          
          <div className='inline-flex w-full mb-4'>

            <h1 className='block w-full'>{lesson.title}</h1>
            
            <div className='flex items-baseline justify-end w-full pt-0 mt-0 mb-0'>
              {lesson.duration !== null && (
                <p className='mr-6'><strong>Duration:</strong> {lesson.duration} min</p>
              )}
              {lesson.level !== null && (
                <p><strong>Level:</strong> {lesson.level}</p>
              )}
            </div>
            
          </div>


          <div className='flex flex-col gap-4 md:flex-row md:gap-6'>

            <div className='mt-1.5 md:w-60 md:flex-shrink-0'>
              <button onClick={() => setIsOpen(!isOpen)}
              className='w-full border-2 rounded-lg cursor-pointer border-primary_lighter hover:bg-primary_lighter'>
                Key Takeaways
              </button>

              {isOpen && (
                <div className='p-3 mt-3 text-sm border rounded-xl bg-primary_lighter/30 border-primary_lighter'>
                  {lesson.summary}
                </div>
              )}
            </div>
            
            <div className='max-w-none'>
              <SafeHTML html={lesson.content} className='max-w-none' />
            </div>
            
          </div>
       
    
    </div>
  );
}
