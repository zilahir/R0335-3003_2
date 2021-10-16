import { AUTH_USER } from '../actions/actionTypes'
import { User } from '../actions/createNewUser'

export interface AuthState {
    auth: boolean;
    user: User;
}

const initialState: AuthState = {
    auth: false,
    user: {} as User
}

interface Action {
    paylaod: User
    type: string
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                auth: {
                    auth: true,
                    user: action.paylaod
                }
            }
        default:
            return state;
    }
}

export default reducer