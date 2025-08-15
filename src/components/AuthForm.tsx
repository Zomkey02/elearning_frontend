import React from 'react'

import {useForm} from 'react-hook-form'
//import {DevTool} from '@hookform/devtools'
import type { AuthFormData, AuthFormProps } from '../types/Types'
import http from '../utils/http';

const AuthForm: React.FC<AuthFormProps> = ({
  legend,
  buttonText,
  endpoint,
  onSuccess,
  includeUsername = false,
  includePasswordConfirmation = false,
}) => { 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    clearErrors();
    try {
      await http.get('/sanctum/csrf-cookie');
      await http.post(endpoint, data);
      onSuccess();
    } catch (error:any) {
      if (error.response?.data?.errors){
        console.error('Validation errors', error.response.data.errors);
      } else {
        console.error('Form submission failed', error);
      }
    }
  }; 

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <form 
       onSubmit={handleSubmit(onSubmit)}
       className='w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md'>
        <fieldset>
          <legend className='mb-6 text-2xl font-bold text-center'>{legend}</legend>

          {includeUsername && (
            <div className='mb-4'>
              <label 
               htmlFor='username'
               className='block mb-2 text-sm font-semibold text-gray-700'
              >Username:
              </label>
              <input 
               type='text'
               id='username'
               className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
               {...register('username', { required: 'Username is required' })}
              />
              <div>
                {errors.username && <div className='mt-1 text-sm text-red-500 '>{errors.username.message}</div>}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <div>
                {errors.email && <div className='mt-1 text-sm text-red-500'>{errors.email.message}</div>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              autoComplete='off'
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                validate: (val) => {
                  if (!/[A-Z]/.test(val)) return 'Password must include uppercase';
                  if (!/[0-9]/.test(val)) return 'Password must include a number';
                  if (!/[@$!%*?&]/.test(val)) return 'Password must include a symbol';
                },
              })}
            />
            <div>
                {errors.password && <div className='mt-1 text-sm text-red-500'>{errors.password.message}</div>}
            </div>
          </div>
          
          {includePasswordConfirmation && (
            <div className="mb-6">
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                autoComplete="off"
                type="password"
                id="password_confirmation"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('password_confirmation', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
              />
              <div>
                {errors.password_confirmation && (
                  <div className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</div>
                )}
              </div>
            </div>
          )}
          
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#6DAE81] text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AuthForm