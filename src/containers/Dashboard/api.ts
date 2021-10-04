
import axios from 'axios';

export const getUsers = async () => await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');

export const getUser = async (userId: number) => await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);


export interface User {
    id: number;
    name: string;
    email: string;
}
