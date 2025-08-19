import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'
import type { LessonFormValues } from '../../types/elearning'
import Tiptap from '../../Tiptap'

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
        control,
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
              className='form-select'
            >
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                ))}
            </select>
          )}
            {errors.course_id && <p className='form-error'>{errors.course_id.message}</p>}
        </div>

        <div>
          <input {...register('title', { required: 'Title is required' })} placeholder='Title' className='form-input' />
          {errors.title && <p className='form-error'>{errors.title.message}</p>}
        </div>

        <div className='inline-flex justify-between w-full'>
          <div>
            <select 
              {...register('layout_type', { required: 'Layout type is required' })} 
              className='pl-5 pr-5 form-select'
            >
                <option value='' disabled>Select Layout Type</option>
                <option value='standard'>Standard</option>
                <option value='video-focused'>Video Focused</option>
                <option value='image-left'>Image Left</option>
                <option value='interactive'>Interactive</option>
            </select>
            {errors.layout_type && <p className='form-error'>{errors.layout_type.message}</p>}
          </div>

          <div className='flex flex-col'>
            <input 
              type='number'
              {...register('duration', { required: 'Duration is required', valueAsNumber:true })} 
              placeholder='Duration' className='form-input max-w-[150px]' 
            />
            {errors.duration && <p className='form-error'>{errors.duration.message}</p>}
          </div>

          <div>
            <select 
              {...register('level', { required: 'Level is required' })} 
              className='pl-5 pr-5 form-select'
            >
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
            </select>
            {errors.level && <p className='form-error'>{errors.level.message}</p>}
          </div>

          <div>
            <select 
              {...register('status', { required: 'Status is required' })} 
              className='pl-5 pr-5 form-select'
            >
                <option value='' disabled>Select Status</option>
                <option value='draft'>Draft</option>
                <option value='published'>Publish</option>
            </select>
            {errors.status && <p className='form-error'>{errors.status.message}</p>}
          </div>
        </div>

        <div>
          <input type='hidden' {...register('slug')} placeholder='Slug' className='form-input' />
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
          <label className='max-h-[100px] flex flex-col items-center justify-center px-6 text-center cursor-pointer rounded-xl py-14 bg-primary'>
            <p className='mb-1 text-lg font-bold tracking-tight text-white'>Upload Thumbnail</p>
            <p className='text-sm text-white '>Click to upload</p>
            <input type="file" className='hidden'
              {...register('thumbnail', {required: mode === 'create' ? 'Thumbnail is required' : false})} 
            />
          </label>
          {errors.thumbnail && <p className='form-error'>{errors.thumbnail.message}</p>}
        </div>

        <div>
          <textarea 
            {...register('summary', { required: 'Summary is required' })} 
            placeholder='Summary' className='form-input min-h-[100px]' 
          />
          {errors.summary && <p className='form-error'>{errors.summary.message}</p>}
        </div>

        <div>
          <Controller 
            name='content'
            control={control}
            rules={{ required: 'Content is required' }}
            render={({field}) => (
              <>
                <Tiptap 
                  value={field.value || ''} 
                  onChange={field.onChange} 
                  placeholder='Write your content' 
                />
                {errors.content && <p className='form-error max-h-50'>{errors.content.message}</p>}
              </>
            )}
          />
        </div>

        <button
            disabled={isSubmitting}
            type='submit'
            className='w-full h-12 btn-secondary'
            >
                {mode === 'create' ? 'Create Lesson' : 'Update Lesson'}
        </button>
    </form>
  )
}

export default LessonForm