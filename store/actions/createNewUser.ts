import * as actionTypes from './actionTypes'

export interface User {
    userId: string,
    userName: string,
    password: string
}

export const createNewUser = (newUser: Omit<User, 'userId'>) => ({
    type: actionTypes.CREATE_NEW_USER,
    payload: {
        ...newUser,
    }
})