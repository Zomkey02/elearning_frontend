import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

type CourseFormValues = {
  title: string;
  slug: string;
  summary: string;
  thumbnail: FileList;
  description: string;
  duration: string;
  status: string;
};

type CourseFormProps = {
  onSubmit: (data: CourseFormValues) => void;
  legend: string;
};



const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, legend }) => {
  const { 
    register, 
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseFormValues>();

  const title = watch('title');

  useEffect(() => {
    if (title) {
      const generatedSlug = slugify(title, { lower: true, strict:true });
      setValue('slug', generatedSlug);
    }
  }, [title, setValue]);



  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 max-w-xl mx-auto'>
        <h2 className='text-center text-2xl font-bold'>{legend}</h2>

        <input {...register('title')} placeholder='Title' className='w-full h-14 p-4 bg-gray-200 rounded-xl' />
        <input type="hidden" {...register('slug')} />
        <input {...register('summary')} placeholder='Summary' className='w-full h-14 p-4 bg-gray-200 rounded-xl' />
        <input type="file" {...register('thumbnail')} />
        <textarea {...register('description')} placeholder='Description' className='w-full min-h-[144px] p-4 bg-gray-200 rounded-xl'></textarea>
        <input {...register('duration')} placeholder='Duration' className='w-full h-14 p-4 bg-gray-200 rounded-xl' />

        <select {...register('status')} className='w-full h-14 p-4 rounded-xl bg-gray-200'>
            <option value=''>Status</option>
            <option value='draft'>Draft</option>
            <option value='publish'>Publish</option>
            <option value='archive'>Archive</option>
        </select>

        <button type='submit' className='w-full h-14 bg-[#6DAE81] text-white rounded-xl hover:bg-[#5aa170] transition'>
            Submit
        </button>


    </form>
  )
}

export default CourseForm