import { DEMO_USER } from '../../utils/consts';
import { CREATE_NEW_USER } from '../actions/actionTypes'
import { User } from '../actions/createNewUser';

export interface UserState {
    users: User[];
}
interface Action {
    payload: User
    type: string,
}

const initialState: UserState = {
    users: [
        {
            ...DEMO_USER
        }
    ]
}

const reducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case CREATE_NEW_USER:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        default:
            return state
    }
}

export default reducer;