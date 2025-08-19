import React, { useState } from 'react'

import {useForm} from 'react-hook-form'
//import {DevTool} from '@hookform/devtools'
import type { AuthFormData, AuthFormProps } from '../types/Types'
import http from '../utils/http';

import { IconContext } from "react-icons";
import { RiEyeLine, RiEyeOffLine  } from "react-icons/ri";

const AuthForm: React.FC<AuthFormProps> = ({
  legend,
  buttonText,
  endpoint,
  onSuccess,
  includeUsername = false,
  includePasswordConfirmation = false,
}) => { 

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); 

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
       className='auth-form'>
        <fieldset>
          <legend className='mb-6 text-2xl font-bold text-center'>{legend}</legend>

          {includeUsername && (
            <div className='mb-4'>
              <label 
               htmlFor='username'
               className='auth-label'
              >Username
              </label>
              <input 
               type='text'
               id='username'
               className='auth-input'
               {...register('username', { required: 'Username is required' })}
              />
              <div>
                {errors.username && <div className='auth-error'>{errors.username.message}</div>}
              </div>
            </div>
          )}

          <div className='mb-4'>
            <label htmlFor='email' className='auth-label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='auth-input'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <div>
                {errors.email && <div className='auth-error'>{errors.email.message}</div>}
            </div>
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='auth-label'>
              Password
            </label>
            <div className='relative'>
              <input
                autoComplete='off'
                type={showPassword ? 'text' : 'password'} 
                id='password'
                className='auth-input'
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
              <button 
                aria-label='button'
                type='button'
                onClick={() => setShowPassword(!showPassword)} 
                className='absolute inset-y-0 flex items-center right-3'>
                  <IconContext.Provider value={{ size:'1.5em', color:'green'}}>
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </IconContext.Provider>
              </button> 
            </div>
            <div>
                {errors.password && <div className='auth-error'>{errors.password.message}</div>}
            </div>
          </div>
          
          {includePasswordConfirmation && (
            <div className='mb-6'>
              <label htmlFor='password_confirmation' className='auth-label'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  autoComplete="off"
                  type={showPasswordConfirm ? 'text' : 'password'} 
                  id='password_confirmation'
                  className='auth-input'
                  {...register('password_confirmation', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                />
                <button 
                  aria-label='Toggle button to see password'
                  type='button'
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} 
                  className='absolute inset-y-0 flex items-center right-3'>
                    <IconContext.Provider value={{ size:'1.5em', color:'primary'}}>
                      {showPasswordConfirm ? <RiEyeOffLine /> : <RiEyeLine />}
                    </IconContext.Provider>
                </button> 
              </div>
              <div>
                {errors.password_confirmation && (
                  <div className='auth-error'>{errors.password_confirmation.message}</div>
                )}
              </div>
            </div>
          )}
          
          <button
            disabled={isSubmitting}
            type='submit'
            className='w-full py-2 font-semibold rounded btn-secondary'
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AuthForm