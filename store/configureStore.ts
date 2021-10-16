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

const rootReducer = combineReducers({
  test,
  users,
})

const composeEnhancers =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWareList = [thunk];

interface TopLevelState {
  test: TestState,
  users: UserState
}

export const store: Store<TopLevelState> = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWareList)))