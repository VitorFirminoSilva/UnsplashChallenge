import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { api } from '../services/axios';
import { ResponseError } from '../errors/ResponseError';

interface ICredentials {
    email: string;
    password: string;
}

interface IUser {
    id: number;
    level: number;
    name: string;
}

interface IAuthState {
    token: string;
    user: IUser;
}

interface IAuthContext {
    signIn(credentials: ICredentials): Promise<void>;
    signOut(): void;
    user?: IUser;
}

interface ApiSessionRequest {
    token: string;
    user: IUser;
}

interface AuthProvider {
    children : any;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
    const [data, setData] = useState<IAuthState>(() => {
        // Carrega os tokens do localStorage e seta os valores do Provider
        const token = localStorage.getItem('@token');
        const user = localStorage.getItem('@user');

        if (token && user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            return {
                token,
                user: JSON.parse(user),
            };
        }

        return {} as IAuthState;
    });

    const signIn = useCallback(async (credentials: ICredentials) => {
        //console.log('Logando');
        //console.log('[Auth Hook] Realizando o login');
        const res = await api.post<ApiSessionRequest>('/sessions', {
            email: credentials.email,
            password: credentials.password,
        });

        const { token, user } = res.data;

        localStorage.setItem('@token', token);
        localStorage.setItem('@user', JSON.stringify(user));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        //console.log('Deslogando');

        localStorage.removeItem('@token');
        localStorage.removeItem('@user');

        setData({} as IAuthState);
    }, []);

    useEffect(() => {
        //console.log('[Auth Hook] Verificando login');
        if (!data.token) {
            return;
        }

        // console.log(data);

        api.get('/sessions/validate')
            .then(() => {
                console.log('[Auth Hook] Logado');
            })
            .catch((err) => {
                signOut();
                let message : string;
                if (err instanceof ResponseError) {
                    message = 'Sessão expirada, entre novamente.';
                } else {
                    message = 'O servidor não teve resposta. Entre novamente mais tarde.';
                }
            });
    }, [data.token, signOut]);

    return (
        <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
