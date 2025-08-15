import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import type { LessonFormValues } from '../types/elearning'

type LessonFormProps = {
    onSubmit: (data: LessonFormValues) => void;
    defaultValues?: Partial<LessonFormValues>
    mode: 'create' | 'update'
    courses: { id: string; title: string } []
    courseIdFromURL?: string;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, defaultValues, mode, courses, courseIdFromURL }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LessonFormValues>({ defaultValues })

    const title = watch('title')

    useEffect(() => {
      if (defaultValues) {
        reset({
          ...defaultValues,
          course_id: defaultValues.course_id || courseIdFromURL || '',
        });
      } else if (courseIdFromURL) {
        setValue('course_id', courseIdFromURL);
      }
    }, [defaultValues, reset, courseIdFromURL, setValue]);

    useEffect(() => {
      if (title) {
        const generatedSlug = slugify(title, { lower: true, strict: true });
        setValue('slug', generatedSlug);
      }
    }, [title, setValue]);


return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-3xl mx-auto space-y-4'>
        <h2 className='text-2xl font-bold text-center'>
            {mode === 'create' ? 'Create a new lesson' : 'Update a lesson'}
        </h2>

        <div>
          {courseIdFromURL ? (
            <input type='hidden' {...register('course_id')} value={courseIdFromURL} />
          ) : (
            <select 
              {...register('course_id', {required:'Course is required'})}
              defaultValue={defaultValues?.course_id}
            >
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                ))}
            </select>
          )}
            {errors.course_id && <p className='text-red-500'>{errors.course_id.message}</p>}
        </div>

        <div>
          <input 
            {...register('title', { required: 'Title is required' })} 
            placeholder='Title' 
            className='w-full h-14 rounded-xl p-4 bg-gray-200 placeholder-[#5c8a5c] text-base font-normal focus:ring-0' 
          />
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>

        <div>
          <input 
            {...register('slug')} 
            placeholder='Slug' 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
          />
        </div>

        {defaultValues?.thumbnailUrl && (
          <div className="mb-4">
            <p className="mb-1 text-sm">Current Thumbnail:</p>
            <img 
              src={defaultValues.thumbnailUrl} 
              alt="Thumbnail" 
              className="w-40 h-auto rounded"
            />
          </div>
        )}

        <div>
          <label className='flex flex-col items-center rounded-xl px-6 py-14 cursor-pointer bg-[#6DAE81] text-center'>
            <p className='mb-1 text-lg font-bold tracking-tight text-white'>Upload Thumbnail</p>
            <p className='max-w-xs text-sm text-white'>Click to upload</p>
            <input type="file" className='hidden'
              {...register('thumbnail', {required: mode === 'create' ? 'Thumbnail is required' : false})} 
            />
          </label>
          {errors.thumbnail && <p className='mt-1 text-sm text-red-500'>{errors.thumbnail.message}</p>}
        </div>

        <div>
          <input 
            {...register('summary', { required: 'Summary is required' })} 
            placeholder='Summary' 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
          />
          {errors.summary && <p className='text-red-500'>{errors.summary.message}</p>}
        </div>


        <div>
            <textarea
              {...register('content', { required: 'Content is required' })}
              placeholder='Content'
              className='w-full min-h-[144px] p-4 bg-gray-200 rounded-xl text-base font-normal resize-none focus:outline-none focus:ring-0'
            />
            {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
        </div>

        <div>
          <input 
            type='number'
            {...register('duration', { required: 'Duration is required', valueAsNumber:true })} 
            placeholder='Duration' 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
          />
          {errors.duration && <p className='text-red-500'>{errors.duration.message}</p>}
        </div>

        <div>
          <select 
            {...register('level', { required: 'Level is required' })} 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl'
          >
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
          </select>
          {errors.level && <p className='text-red-500'>{errors.level.message}</p>}
        </div>

        <div>
          <select 
            {...register('status', { required: 'Status is required' })} 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl'
          >
              <option value='' disabled>Select Status</option>
              <option value='draft'>Draft</option>
              <option value='published'>Publish</option>
          </select>
          {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
        </div>

        <div>
          <select 
            {...register('layout_type', { required: 'Layout type is required' })} 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl'
          >
              <option value='' disabled>Select Layout Type</option>
              <option value='standard'>Standard</option>
              <option value='video-focused'>Video Focused</option>
              <option value='image-left'>Image Left</option>
              <option value='interactive'>Interactive</option>
          </select>
          {errors.layout_type && <p className='text-red-500'>{errors.layout_type.message}</p>}
        </div>

        <button
            disabled={isSubmitting}
            type='submit'
            className='w-full h-14 bg-[#6DAE81] text-white rounded-xl hover:bg-[#5aa170] transition'
            >
                {mode === 'create' ? 'Create Lesson' : 'Update Lesson'}
        </button>
    </form>
  )
}

export default LessonForm