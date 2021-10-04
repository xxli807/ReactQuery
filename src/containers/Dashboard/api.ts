
import axios from 'axios';

export const getUsers = async () => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

export const getUser = async (userId: number) => {
    const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
}


export interface User {
    id: number;
    name: string;
    email: string;
}
