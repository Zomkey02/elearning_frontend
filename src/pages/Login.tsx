import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import http from '../utils/http'
import { useAuth } from '../hooks/useAuth'
import { PageLoader } from '../components/Loading'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);


  const handleLoginSuccess = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

   

  return (
    <div className='min-h-screen bg-[#fdfdfd] text-black'>

      {loading && (
        <div className='text-center'>
          <PageLoader label='You are logging in...' />
        </div>
      )}
      
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
