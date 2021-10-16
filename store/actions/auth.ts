import { AUTH_USER } from './actionTypes'
import { User } from './createNewUser'

export const authuser = (user: User) => ({
    type: AUTH_USER,
    paylaod: user
})