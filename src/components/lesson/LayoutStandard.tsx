import React from 'react'
import { getThumbnailUrl } from '../../utils/getThumbnailUrl';
import type { Lesson } from '../../types/elearning';
import SafeHTML from '../../components/SafeHTML';

type LessonResponse = { lesson: Lesson };

export default function LayoutStandard({lesson}: LessonResponse) {

    const thumbnailUrl = getThumbnailUrl(lesson.thumbnail ?? null);

  return (
    <div>
    
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for ${lesson.title}`}
              className='object-cover w-full h-64 mb-0 rounded-lg shadow'
            />
          ) : (<div>No thumbnail available</div> )}
    
          <div className='flex items-center justify-end w-full pt-0 mt-0 mb-0'>
              {lesson.duration !== null && (
                <p className='mr-6'><strong>Duration:</strong> {lesson.duration} min</p>
              )}
              {lesson.level !== null && (
                <p><strong>Level:</strong> {lesson.level}</p>
              )}
          </div>
            
          <h1 className='mb-2'>{lesson.title}</h1>
          
          <SafeHTML html={lesson.content} className='max-w-none' />
    
    </div>
  );
}
