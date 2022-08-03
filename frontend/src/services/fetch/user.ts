import axios, { CancelToken } from 'axios';
import { api } from '../axios';

export interface People {
    id: number;
    name: string;
    email?: string;
}

interface ICredentials {
    email: string;
    password: string;
}

export const fetchGetUser = ( options: ICredentials): Promise<{ user: People }> => {
    return new Promise((resolve, reject) => {

        api.post<People>('/user/login', {
            email: options?.email,
            password: options?.password,
        })
            .then((response) => {
                if (response) {
                    const data = response.data;
                    const user = data
                    resolve({ user });
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};


