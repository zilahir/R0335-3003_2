import { useSelector } from 'react-redux'
import { TopLevelState } from '../store/configureStore'
import { AuthState } from '../store/reducers/auth'

export const useAuth = (): AuthState | false => {
    const auth = useSelector((store: TopLevelState) => store.auth)
    console.log('auth', auth)
    if (auth.auth) {
        return {
            ...auth
        }
    }
    else {
        return false
    }
} 