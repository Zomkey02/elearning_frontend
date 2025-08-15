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
      className='w-full max-w-xl p-4 mx-auto space-y-6'>
        <h2 className='text-2xl font-bold text-center'>
          {mode === 'create' ? 'Create New Course' : 'Update Course'}
        </h2>

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

        <div>
          <select 
            {...register('category', { required: 'Category is required' })} 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl'
          >
              <option value='investing-basics'>Investing Basics</option>
              <option value='passive-investing-strategies'>Passive Investing Strategies</option>
              <option value='personal-finance'>Personal Finance</option>
          </select>
          {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
        </div>

        <div>
          <input 
            {...register('summary', { required: 'Summary is required' })} 
            placeholder='Summary' 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl' 
          />
          {errors.summary && <p className='text-red-500'>{errors.summary.message}</p>}
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
          <label className='flex flex-col items-center rounded-xl border-2 border-dashed border-[#d4e2d4] px-6 py-14 cursor-pointer bg-[#6DAE81] text-center'>
            <p className='mb-1 text-lg font-bold tracking-tight'>Upload Thumbnail</p>
            <p className='max-w-xs text-sm'>Click to upload</p>
            <input type="file" className='hidden'
              {...register('thumbnail', {required: mode === 'create' ? 'Thumbnail is required' : false})} 
            />
          </label>
          
          {errors.thumbnail && <p className='mt-1 text-sm text-red-500'>{errors.thumbnail.message}</p>}
        </div>

{/*         <div>
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            placeholder='Description' 
            className='w-full min-h-[144px] p-4 bg-gray-200 rounded-xl text-base font-normal resize-none focus:outline-none focus:ring-0'>  
          </textarea>
          {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
        </div> */}
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
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
              </>
            )}
          />
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
            {...register('status', { required: 'Status is required' })} 
            className='w-full p-4 bg-gray-200 h-14 rounded-xl'
          >
              <option value='' disabled>Select Status</option>
              <option value='draft'>Draft</option>
              <option value='published'>Publish</option>
          </select>
          {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
        </div>

        <button 
          disabled={isSubmitting} 
          type='submit' 
          className='w-full h-14 bg-[#6DAE81] text-white rounded-xl hover:bg-[#5aa170] transition'>
          {mode === 'create' ? 'Create Course' : 'Update Course'}
        </button>
    </form>
  )
}

export default CourseForm