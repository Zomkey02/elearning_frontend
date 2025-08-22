import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import type { CourseFormValues } from '../../types/elearning';
import Tiptap from '../../Tiptap';

/* type CourseFormValues = {
  title: string;
  slug: string;
  summary: string;
  thumbnail: FileList;
  description: string;
  duration: number;
  status: string;
  thumbnailUrl?: string;
}; */

type CourseFormProps = {
  onSubmit: (data: CourseFormValues) => void | Promise<void>;
  defaultValues?: Partial<CourseFormValues>;
  mode: 'create' | 'update';
};

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, defaultValues, mode }) => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues> ({ defaultValues });
  
  const title = watch('title');

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (title) {
      const generatedSlug = slugify(title, { lower: true, strict:true });
      setValue('slug', generatedSlug);
    }
  }, [title, mode, setValue]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-3xl p-4 mx-auto space-y-6'>
        <h2 className='text-2xl font-bold text-center'>
          {mode === 'create' ? 'Create New Course' : 'Update Course'}
        </h2>

        <div>
          <input {...register('title', { required: 'Title is required' })} 
            placeholder='Title' className='form-input' 
          />
          {errors.title && <p className='form-error'>{errors.title.message}</p>}
        </div>

        <div className='hidden'>
          <input {...register('slug')} 
            placeholder='Slug' className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
          />
        </div> 

        <div className='inline-flex w-full '>
          <div className='w-1/2 mr-3'>
            <select 
              {...register('category', { required: 'Category is required' })} 
              className='form-select'
            >
                <option value='investing-basics'>Investing Basics</option>
                <option value='passive-investing-strategies'>Passive Investing Strategies</option>
                <option value='personal-finance'>Personal Finance</option>
            </select>
            {errors.category && <p className='form-error'>{errors.category.message}</p>}
          </div>

          <div className='w-1/4 mr-3'>
            <input 
              type='number'
              {...register('duration', { required: 'Duration is required', valueAsNumber:true })} 
              placeholder='Duration' 
              className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
            />
            {errors.duration && <p className='form-error'>{errors.duration.message}</p>}
          </div>

          <div className='w-1/4'>
            <select 
              {...register('status', { required: 'Status is required' })} 
              className='w-full p-4 bg-gray-200 h-14 rounded-xl'
            >
                <option value='' disabled>Select Status</option>
                <option value='draft'>Draft</option>
                <option value='published'>Publish</option>
            </select>
            {errors.status && <p className='form-error'>{errors.status.message}</p>}
          </div>
        </div>
        
        {defaultValues?.thumbnailUrl && (
          <div className='max-h-[100px] flex items-center justify-start text-center bg-gray-200 rounded-xl py-14'>
            <p className='mb-1 text-lg pr-2.5'>Current Thumbnail:</p>
            <img 
              src={defaultValues.thumbnailUrl} 
              alt="Thumbnail" 
              className="w-40 h-auto rounded"
            />
          </div>
        )}

        <div>
          <label className='max-h-[100px] flex flex-col items-center justify-center px-2 text-center cursor-pointer rounded-xl py-14 bg-primary'>
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
            {...register('summary', { required: 'Summary is required', maxLength: {value:100, message: 'Summary cannot exceed 100 Characters'} })} 
            placeholder='Summary' 
            className='form-input min-h-[100px]' 
          />
          {errors.summary && <p className='form-error'>{errors.summary.message}</p>}
        </div>
        
        <div>
          <Controller 
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({field}) => (
              <>
                <Tiptap 
                  value={field.value || ''} 
                  onChange={field.onChange} 
                  placeholder='Write your description' 
                />
                {errors.description && <p className='form-error'>{errors.description.message}</p>}
              </>
            )}
          />
        </div>

        <button 
          disabled={isSubmitting} 
          type='submit' 
          className='w-full h-12 btn-secondary'>
          {mode === 'create' ? 'Create Course' : 'Update Course'}
        </button>
    </form>
  )
}

export default CourseForm