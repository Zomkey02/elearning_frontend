import { useContext, useEffect, useState } from 'react';
import { AuthContext, defaultAuth } from '../context/AuthProvider';
import http from '../utils/http';
import { useNavigate } from 'react-router-dom';

type Props = {
  isVisible: boolean;
};

const LogOut = ({ isVisible }: Props) => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
  
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
          await http.post('/api/logout');
          setAuth(defaultAuth);
          navigate('/', { replace: true });
        } catch (error:any) {
          console.error('Error:', error.message);
          setIsLoggingOut(false);
        }
      };
  
    return isVisible ? (
        <button className="border-2 btn-nav text-dark border-primary bg-light hover:bg-primary hover:text-light" onClick={handleLogout}>
          Log Out
        </button>
    ): null; 
  };

export default LogOut