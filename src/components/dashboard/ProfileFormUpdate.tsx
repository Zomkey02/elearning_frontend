import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import http from '../../utils/http';

type ProfileFormUpdateValues = {
    username: string;
    email: string;
    current_password: string;
    password?: string;
    password_confirmation?: string;
};

type ProfileFormUpdateProps = {
    defaultValues: Pick<ProfileFormUpdateValues, 'username' | 'email'>;
    onSuccess: (updatedUser: { id: number; username: string; email: string}) => void;
    endpoint?: string;
    className?: string;
};


const ProfileFormUpdate: React.FC<ProfileFormUpdateProps> = ({
    defaultValues,
    onSuccess,
    endpoint = '/api/update',
    className,
}) => { 
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormUpdateValues>({
        defaultValues,
    });

const pwd = watch('password');

useEffect(() => {
    reset(defaultValues);
}, [defaultValues, reset]);

const onSubmit = async (data: ProfileFormUpdateValues) => {
    clearErrors();

    const payload: Record<string, unknown> = {
        current_password: data.current_password,
    };
    if (data.username && data.username !== defaultValues.username) {
        payload.username = data.username;
    }
    if (data.email && data.email !== defaultValues.email) {
        payload.email = data.email;
    }
    if (data.password) {
        payload.password = data.password;
        payload.password_confirmation = data.password_confirmation;
    }

    try {
      await http.get('/sanctum/csrf-cookie');
      const res = await http.post(endpoint, payload);
      const {id, username, email} = res.data.user;
      onSuccess({id, username, email});
    } catch (err:any) {
      const vErrors = err?.response?.data?.errors;
      const message = err?.response?.data?.message;
      if (vErrors && typeof vErrors === 'object') {
        Object.entries(vErrors).forEach(([field, msgs]) => {
            const firstMsg = Array.isArray(msgs) ? msgs[0] : String(msgs);
            if(
                field === 'username' ||
                field === 'email'  ||
                field === 'password' ||
                field === 'password_confirmation' ||
                field === 'current_password'
            ) {
                setError(field as keyof ProfileFormUpdateValues, {type: 'server', message: firstMsg});
            }
        });
        return;
      }
      if (message) {
        setError('current_password', {type: 'server', message});
      } else {
        setError('current_password', {type: 'server', message: 'Update failed, Please try again.'});
      }
    }
};
    
  return (
    <form
        onSubmit={ handleSubmit(onSubmit)}
        className={className ?? 'w-full max-w-xl p-4'}
    >
        <h3 className='mb-4 text-xl font-bold'>Update Profile</h3>

        <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='username'>
                Username
            </label>
            <input
                id='username'
                type='text'
                className='w-full px-3 py-2 border rounded border-gary-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                {...register('username', { required: 'Username is required.'})}
            />
            {errors.username && <div className='mt-1 text-sm text-red-500'>{errors.username.message}</div>}
        </div>

        <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='email'>
                Email
            </label>
            <input
                id='email'
                type='email'
                className='w-full px-3 py-2 border rounded border-gary-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                {...register('email', {pattern: {value: /^\S+@\S+$/i, message: 'Invalid email addres'},})}
            />
            {errors.email && <div className='mt-1 text-sm text-red-500'>{errors.email.message}</div>}
        </div>

        <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='password'>
                New Password (optional)
            </label>
            <input
                id='password'
                type='password'
                autoComplete='off'
                className='w-full px-3 py-2 border rounded border-gary-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                {...register('password', {
                    validate: (val) => {
                        if (!val) return true;
                        if (val.length < 8) return 'Password must be at least 8 characters long';
                        if (!/[A-Z]/.test(val) || !/[0-9]/.test(val))  {
                            return 'Password must contain at least one uppercase and a number';
                        } 
                        return true; 
                    },
                })}
            />
            {errors.password && <div className='mt-1 text-sm text-red-500'>{errors.password.message}</div>}
        </div>

        {pwd && (
            <div className='mb-4'>
                <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='password_confirmation'>
                    Confirm New Password
                </label>
                <input
                    id='password_confirmation'
                    type='password'
                    autoComplete='off'
                    className='w-full px-3 py-2 border rounded border-gary-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    {...register('password_confirmation', {
                        required: 'Please confirm new password',
                        validate: (value) => value === pwd || 'Passwords do not match',
                    })}
                />
                {errors.password_confirmation && (
                    <div className='mt-1 text-sm text-red-500'>{errors.password_confirmation.message}</div>
                )}
            </div>
        )}

        <div className='mb-6'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='current_password'>
                Current Password required
            </label>
            <input 
                id='current_password'
                type='password'
                autoComplete='off'
                className='w-full px-3 py-2 border rounded border-gary-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                {...register('current_password', {required: 'Current password is required'})}
            />
            {errors.current_password && (
                <div className='mt-1 text-sm text-red-500'>{errors.current_password.message}</div>
            )}
        </div>
        <button
            disabled={isSubmitting}
            type='submit'
            className='btn-primary'
        >
            Update Profile Info
        </button>
    </form>
  );
};

export default ProfileFormUpdate