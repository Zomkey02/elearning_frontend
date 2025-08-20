import React from 'react'
import { getThumbnailUrl } from '../../utils/getThumbnailUrl';
import type { Lesson } from '../../types/elearning';
import SafeHTML from '../../utils/SafeHTML';

type LessonResponse = { lesson: Lesson };

export default function LayoutImgLeft({lesson}: LessonResponse) {

    const thumbnailUrl = getThumbnailUrl(lesson.thumbnail ?? null);

  return (
    <div className='flex flex-col gap-4 md:flex-row md:gap-6'>
      
      <div className='mt-1.5 md:w-48 md:flex-shrink-0'>
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for ${lesson.title}`}
              className='object-cover w-full h-64 mb-0 rounded-lg shadow'
            />
          ) : (<div>No thumbnail available</div> )}

          <h1 className='mb-2'>{lesson.title}</h1>

          <div className='flex justify-start w-full pt-0 mt-0 mb-0 space-x-2 md:flex-col'>
          {lesson.duration !== null && (
            <p className='text-sm'><strong>Duration:</strong> {lesson.duration} min</p>
          )}
          {lesson.level !== null && (
            <p className='text-sm'><strong>Level:</strong> {lesson.level}</p>
          )}
        </div>
          
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        

        <div>
          <SafeHTML html={lesson.content} className='mb-5 max-w-none' />
        </div>

      </div>

      Investing 101 is your ultimate guide to understanding the world of investing. It is kept simple and short, focusing on the most important aspects without boring jargons.
      
    
          
    
            
            
          
          
          
    
    </div>
  );
}
