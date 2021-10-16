import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
    Store,
  } from "redux";
import thunk from "redux-thunk";

import users, { UserState } from "./reducers/createNewUser";
import test, { TestState } from './reducers/test'
import auth, { AuthState } from './reducers/auth'

const rootReducer = combineReducers({
  test,
  users,
  auth,
})

const composeEnhancers =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWareList = [thunk];

export interface TopLevelState {
  test: TestState,
  users: UserState
  auth: AuthState
}

export const store: Store<TopLevelState> = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWareList)))