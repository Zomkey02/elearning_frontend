import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-[#fdfdfd] text-black'>
      
      <AuthForm
        legend='Create your Account'
        buttonText='Sign Up'
        endpoint='api/register'
        onSuccess={handleSignUpSuccess}
        includeUsername
        includePasswordConfirmation
      />
    </div>
  )
}

export default SignUp