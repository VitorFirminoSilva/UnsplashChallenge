import React, { useCallback } from 'react';

interface ICredentials {
    email: string;
    password: string;
}

/*const AuthProvider: boolean = () => {

    const signIn = useCallback(async (credentials: ICredentials) => {

       const res = await api.post<ApiSessionRequest>('/sessions', {
            email: credentials.email,
            password: credentials.password,
        });

        localStorage.setItem('@ifspEventos:user', JSON.stringify(res));   
    }, []);

    return true;
}

export default AuthProvider;*/