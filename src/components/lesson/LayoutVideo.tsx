import React from 'react'
import { getThumbnailUrl } from '../../utils/getThumbnailUrl';
import type { Lesson } from '../../types/elearning';
import SafeHTML from '../../utils/SafeHTML';

type LessonResponse = { lesson: Lesson };

export default function LayoutStandard({lesson}: LessonResponse) {

    const thumbnailUrl = getThumbnailUrl(lesson.thumbnail ?? null);

  return (
        <div className='max-w-4xl p-6 mx-auto space-y-6'>

          <p>Layout Type: {lesson.layout_type}</p>
    
          
          <div className='flex justify-end mt-0'>
            {lesson.duration !== null && (
              <p className='mr-6'><strong>Duration:</strong> {lesson.duration} min</p>
            )}
            {lesson.level !== null && (
              <p><strong>Level:</strong> {lesson.level}</p>
            )}
          </div>
          <h1>{lesson.title}</h1>
          
         {/*  {lesson.content && <div className='whitespace-pre-line'>{lesson.content}</div>} */}
          <SafeHTML html={lesson.content} className='max-w-none' />
    
        </div>

  );
}
