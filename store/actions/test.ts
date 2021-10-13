import { TEST } from './actionTypes'

export const test = (test: string) => ({
    type: TEST,
    payload: {
        testItem: test
    },
});