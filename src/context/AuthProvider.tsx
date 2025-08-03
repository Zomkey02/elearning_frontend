import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import http from '../utils/http';

type Status = 'loading' | 'loggedIn' | 'loggedOut';

type Auth = {
    data: { id: number; username: string} | null;
    status: Status;
};

type AuthContextType = {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const defaultAuth: Auth = {
    data: null,
    status: 'loading'
};

const defaultAuthContext: AuthContextType = {
    auth: defaultAuth,
    setAuth: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<Auth>(defaultAuth);

    useEffect(() => {
        const getAuth = async () => {
            try {
                const userData = await http.get('/api/user');
                setAuth({
                data: {
                    id: userData.data.id,
                    username: userData.data.username,
                },
                status: 'loggedIn',
                });
            } catch (error) {
                console.error('User not authenticated:', error);
                setAuth({
                data: null,
                status: 'loggedOut',
                });
            }
        };
        getAuth();
    }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;