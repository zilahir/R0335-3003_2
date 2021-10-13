import { TEST } from '../actions/actionTypes'

export interface TestState {
    testItem: string
}

const initialState: TestState = {
	testItem: 'test',
}

interface Action {
    payload: TestState,
    type: string,

}

const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
	case TEST:
		return {
			...state,
			testItem: action.payload.testItem,
		}
	default:
		return state
	}
}

export default reducer