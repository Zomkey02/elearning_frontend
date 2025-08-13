import React  from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import http from '../utils/http'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();


  const handleLoginSuccess = async () => {
    try {
      const userData = await http.get('/api/user');
      setAuth({
        data: {...userData.data,
        id: userData.data.id,
        username: userData.data.username},
        status: 'loggedIn'
      });

    navigate('/dashboard');
    } catch (error) {
      console.error('Failed to fetch user after login', error);
    }
  };

  return (
    <div className='min-h-screen bg-[#fdfdfd] text-black'>
      
      <AuthForm
        legend='Login your Account'
        buttonText='Login'
        endpoint='api/login'
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default Login
