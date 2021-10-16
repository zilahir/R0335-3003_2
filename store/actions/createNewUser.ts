import { CREATE_NEW_USER } from './actionTypes'
export interface User {
    userId: string,
    userName: string,
    password: string
}

export const createNewUser = (newUser: Omit<User, 'userId'>) => ({
    type: CREATE_NEW_USER,
    payload: {
        ...newUser,
    }
})